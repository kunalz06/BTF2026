"use client";

import Link from "next/link";
import type { Session } from "@supabase/supabase-js";
import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { EventIcon } from "@/components/event-icons";
import { problemStatements, problemTracks } from "@/data/problem-statements";
import {
  isValidTeamCode,
  normalizeTeamCode,
  TEAM_MAX_MEMBERS,
  TEAM_MIN_MEMBERS,
} from "@/lib/participation";
import { supabase } from "@/lib/supabase-browser";

type TeamRow = {
  id: string;
  team_code: string;
  name: string;
  leader_id: string;
  problem_slug: string | null;
  created_at: string;
};

type MemberRow = {
  user_id: string;
  joined_at: string;
};

type MemberView = MemberRow & {
  email: string;
};

type Feedback = {
  tone: "success" | "error" | "info";
  message: string;
} | null;

function getErrorMessage(error: unknown) {
  if (error && typeof error === "object" && "message" in error) {
    const message = String((error as { message: unknown }).message);
    if (message.includes("already a member")) return "You are already part of a team.";
    if (message.includes("Team ID not found")) return "No team was found with that team ID.";
    if (message.includes("already has 6 members")) return "That team is already full.";
    if (message.includes("Only the team leader")) return "Only the team leader can select the problem statement.";
    return message;
  }
  return "Something went wrong. Please try again.";
}

export function ParticipationClient() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [team, setTeam] = useState<TeamRow | null>(null);
  const [members, setMembers] = useState<MemberView[]>([]);
  const [loadingTeam, setLoadingTeam] = useState(false);
  const [busyAction, setBusyAction] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [teamName, setTeamName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [problemSlug, setProblemSlug] = useState("");
  const [copied, setCopied] = useState(false);

  const user = session?.user ?? null;
  const isLeader = Boolean(user && team && team.leader_id === user.id);
  const selectedProblem = useMemo(
    () => problemStatements.find((problem) => problem.slug === team?.problem_slug) ?? null,
    [team?.problem_slug],
  );

  const refreshTeam = useCallback(async (userId: string, quiet = false) => {
    if (!quiet) setLoadingTeam(true);

    try {
      const membershipResult = await supabase
        .from("btf_team_members")
        .select("team_id, joined_at")
        .eq("user_id", userId)
        .maybeSingle();

      if (membershipResult.error) throw membershipResult.error;

      if (!membershipResult.data) {
        setTeam(null);
        setMembers([]);
        setProblemSlug("");
        return;
      }

      const teamId = membershipResult.data.team_id;

      const [teamResult, memberResult] = await Promise.all([
        supabase
          .from("btf_teams")
          .select("id, team_code, name, leader_id, problem_slug, created_at")
          .eq("id", teamId)
          .single(),
        supabase
          .from("btf_team_members")
          .select("user_id, joined_at")
          .eq("team_id", teamId)
          .order("joined_at", { ascending: true }),
      ]);

      if (teamResult.error) throw teamResult.error;
      if (memberResult.error) throw memberResult.error;

      const memberRows = (memberResult.data ?? []) as MemberRow[];
      const memberIds = memberRows.map((member) => member.user_id);

      let emailMap = new Map<string, string>();
      if (memberIds.length > 0) {
        const profileResult = await supabase
          .from("btf_participants")
          .select("user_id, email")
          .in("user_id", memberIds);

        if (profileResult.error) throw profileResult.error;
        emailMap = new Map(
          (profileResult.data ?? []).map((profile) => [profile.user_id, profile.email]),
        );
      }

      const teamData = teamResult.data as TeamRow;
      const memberViews = memberRows
        .map((member) => ({
          ...member,
          email: emailMap.get(member.user_id) ?? "Team member",
        }))
        .sort((a, b) => {
          if (a.user_id === teamData.leader_id) return -1;
          if (b.user_id === teamData.leader_id) return 1;
          return a.joined_at.localeCompare(b.joined_at);
        });

      setTeam(teamData);
      setMembers(memberViews);
      setProblemSlug(teamData.problem_slug ?? "");
    } catch (error) {
      setFeedback({ tone: "error", message: getErrorMessage(error) });
    } finally {
      if (!quiet) setLoadingTeam(false);
    }
  }, []);

  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (active) setSession(data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!user) return;

    void refreshTeam(user.id);

    const onVisible = () => {
      if (document.visibilityState === "visible") void refreshTeam(user.id, true);
    };

    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [refreshTeam, user]);

  async function handleAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback(null);

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || password.length < 8) {
      setFeedback({
        tone: "error",
        message: "Enter a valid email and a password with at least 8 characters.",
      });
      return;
    }

    setBusyAction("auth");

    try {
      if (authMode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email: normalizedEmail,
          password,
        });

        if (error) throw error;

        if (data.session) {
          setFeedback({ tone: "success", message: "Account created. You are signed in." });
        } else {
          setFeedback({
            tone: "info",
            message:
              "Account created. Check your email for the Supabase confirmation message. After confirming, return here and sign in.",
          });
          setAuthMode("signin");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password,
        });

        if (error) throw error;
        setFeedback({ tone: "success", message: "Signed in successfully." });
      }
    } catch (error) {
      setFeedback({ tone: "error", message: getErrorMessage(error) });
    } finally {
      setBusyAction(null);
    }
  }

  async function handleCreateTeam(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) return;

    const name = teamName.trim();
    if (name.length < 2 || name.length > 60) {
      setFeedback({ tone: "error", message: "Team name must be between 2 and 60 characters." });
      return;
    }

    setBusyAction("create-team");
    setFeedback(null);

    try {
      const { data, error } = await supabase
        .from("btf_team_creation_requests")
        .insert({ team_name: name })
        .select("created_team_code")
        .single();

      if (error) throw error;
      setTeamName("");
      setFeedback({
        tone: "success",
        message: `Team created. Your team ID is ${data.created_team_code}.`,
      });
      await refreshTeam(user.id);
    } catch (error) {
      setFeedback({ tone: "error", message: getErrorMessage(error) });
    } finally {
      setBusyAction(null);
    }
  }

  async function handleJoinTeam(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) return;

    const code = normalizeTeamCode(joinCode);
    if (!isValidTeamCode(code)) {
      setFeedback({
        tone: "error",
        message: "Enter the complete 7-character alphanumeric team ID.",
      });
      return;
    }

    setBusyAction("join-team");
    setFeedback(null);

    try {
      const { error } = await supabase
        .from("btf_team_join_requests")
        .insert({ team_code: code })
        .select("joined_team_id")
        .single();

      if (error) throw error;
      setJoinCode("");
      setFeedback({ tone: "success", message: "You joined the team successfully." });
      await refreshTeam(user.id);
    } catch (error) {
      setFeedback({ tone: "error", message: getErrorMessage(error) });
    } finally {
      setBusyAction(null);
    }
  }

  async function handleProblemSelection(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user || !isLeader || !problemSlug) return;

    setBusyAction("problem");
    setFeedback(null);

    try {
      const { error } = await supabase
        .from("btf_problem_selection_requests")
        .insert({ problem_slug: problemSlug })
        .select("selected_team_id")
        .single();

      if (error) throw error;
      setFeedback({ tone: "success", message: "Problem statement saved for your team." });
      await refreshTeam(user.id);
    } catch (error) {
      setFeedback({ tone: "error", message: getErrorMessage(error) });
    } finally {
      setBusyAction(null);
    }
  }

  async function handleSignOut() {
    setBusyAction("signout");
    const { error } = await supabase.auth.signOut();
    if (error) {
      setFeedback({ tone: "error", message: getErrorMessage(error) });
    } else {
      setFeedback(null);
      setTeam(null);
      setMembers([]);
    }
    setBusyAction(null);
  }

  async function copyTeamCode() {
    if (!team) return;
    try {
      await navigator.clipboard.writeText(team.team_code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setFeedback({ tone: "error", message: "Could not copy the team ID. Please copy it manually." });
    }
  }

  if (session === undefined) {
    return (
      <section className="participation-shell">
        <div className="shell participation-loading">Loading participant portal…</div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="participation-shell">
        <div className="shell participation-auth-layout">
          <aside className="participation-auth-intro">
            <p className="eyebrow">Participant account</p>
            <h2>One account for your hackathon team.</h2>
            <p>
              Your Supabase account keeps your team membership private and persistent across
              devices. A participant can belong to only one team.
            </p>
            <div className="participation-auth-points">
              <div><EventIcon name="users" /><span>Create or join exactly one team</span></div>
              <div><EventIcon name="network" /><span>See every teammate after joining</span></div>
              <div><EventIcon name="document" /><span>Keep one challenge attached to the team</span></div>
            </div>
          </aside>

          <div className="participation-auth-card">
            <div className="auth-mode-tabs" role="tablist" aria-label="Account mode">
              <button
                className={authMode === "signup" ? "active" : ""}
                type="button"
                onClick={() => { setAuthMode("signup"); setFeedback(null); }}
              >
                Create account
              </button>
              <button
                className={authMode === "signin" ? "active" : ""}
                type="button"
                onClick={() => { setAuthMode("signin"); setFeedback(null); }}
              >
                Sign in
              </button>
            </div>

            <form className="participation-form" onSubmit={handleAuth}>
              <div>
                <label htmlFor="participant-email">Email</label>
                <input
                  id="participant-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@college.edu"
                  required
                />
              </div>
              <div>
                <label htmlFor="participant-password">Password</label>
                <input
                  id="participant-password"
                  type="password"
                  autoComplete={authMode === "signup" ? "new-password" : "current-password"}
                  minLength={8}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Minimum 8 characters"
                  required
                />
              </div>

              {feedback ? <PortalMessage feedback={feedback} /> : null}

              <button className="button participation-submit" type="submit" disabled={busyAction === "auth"}>
                {busyAction === "auth"
                  ? "Please wait…"
                  : authMode === "signup"
                    ? "Create participant account"
                    : "Sign in"}
              </button>
            </form>

            <p className="participation-auth-note">
              Email/password authentication is handled by Supabase Auth. If email confirmation is
              requested, confirm the message in your inbox, return to this page, and sign in.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="participation-shell participation-dashboard-shell">
      <div className="shell">
        <div className="participant-account-bar">
          <div>
            <span>Signed in as</span>
            <strong>{user.email}</strong>
          </div>
          <div className="participant-account-actions">
            {team ? (
              <button
                type="button"
                className="portal-quiet-button"
                onClick={() => void refreshTeam(user.id)}
                disabled={loadingTeam}
              >
                {loadingTeam ? "Refreshing…" : "Refresh team"}
              </button>
            ) : null}
            <button
              type="button"
              className="portal-quiet-button"
              onClick={() => void handleSignOut()}
              disabled={busyAction === "signout"}
            >
              Sign out
            </button>
          </div>
        </div>

        {feedback ? <PortalMessage feedback={feedback} /> : null}

        {loadingTeam ? (
          <div className="participation-loading participation-loading-card">Loading your team…</div>
        ) : team ? (
          <TeamDashboard
            team={team}
            members={members}
            userId={user.id}
            isLeader={isLeader}
            selectedProblem={selectedProblem}
            problemSlug={problemSlug}
            setProblemSlug={setProblemSlug}
            busyAction={busyAction}
            copied={copied}
            copyTeamCode={copyTeamCode}
            handleProblemSelection={handleProblemSelection}
          />
        ) : (
          <div className="no-team-area">
            <div className="portal-section-heading">
              <p className="eyebrow">Team setup</p>
              <h2>Create a team or join an existing one.</h2>
              <p>
                Once you join a team, this account cannot join another team. Teams can contain up
                to {TEAM_MAX_MEMBERS} participants.
              </p>
            </div>

            <div className="team-action-grid">
              <form className="team-action-card" onSubmit={handleCreateTeam}>
                <span className="team-action-icon"><EventIcon name="users" /></span>
                <p className="eyebrow">New team</p>
                <h3>Create a team</h3>
                <p>
                  Give your team a name. You become the team leader automatically and receive a
                  unique shareable 7-character team ID.
                </p>
                <label htmlFor="team-name">Team name</label>
                <input
                  id="team-name"
                  value={teamName}
                  maxLength={60}
                  onChange={(event) => setTeamName(event.target.value)}
                  placeholder="Example: Vector Forge"
                  required
                />
                <button className="button" type="submit" disabled={busyAction === "create-team"}>
                  {busyAction === "create-team" ? "Creating…" : "Create team"}
                </button>
              </form>

              <form className="team-action-card" onSubmit={handleJoinTeam}>
                <span className="team-action-icon team-action-icon-purple"><EventIcon name="network" /></span>
                <p className="eyebrow">Existing team</p>
                <h3>Join with a team ID</h3>
                <p>
                  Ask the team leader for the 7-character team ID, enter it below, and you will be
                  added if the team still has space.
                </p>
                <label htmlFor="team-code">Team ID</label>
                <input
                  id="team-code"
                  className="team-code-input"
                  value={joinCode}
                  inputMode="text"
                  autoCapitalize="characters"
                  autoCorrect="off"
                  spellCheck={false}
                  maxLength={7}
                  onChange={(event) => setJoinCode(normalizeTeamCode(event.target.value))}
                  placeholder="ABC2X7Q"
                  required
                />
                <button className="button" type="submit" disabled={busyAction === "join-team"}>
                  {busyAction === "join-team" ? "Joining…" : "Join team"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function PortalMessage({ feedback }: { feedback: NonNullable<Feedback> }) {
  return (
    <div className={`portal-message portal-message-${feedback.tone}`} role="status">
      {feedback.message}
    </div>
  );
}

function TeamDashboard({
  team,
  members,
  userId,
  isLeader,
  selectedProblem,
  problemSlug,
  setProblemSlug,
  busyAction,
  copied,
  copyTeamCode,
  handleProblemSelection,
}: {
  team: TeamRow;
  members: MemberView[];
  userId: string;
  isLeader: boolean;
  selectedProblem: (typeof problemStatements)[number] | null;
  problemSlug: string;
  setProblemSlug: (value: string) => void;
  busyAction: string | null;
  copied: boolean;
  copyTeamCode: () => Promise<void>;
  handleProblemSelection: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}) {
  const minimumReady = members.length >= TEAM_MIN_MEMBERS;

  return (
    <div className="team-dashboard">
      <header className="team-dashboard-header">
        <div>
          <p className="eyebrow">Your team</p>
          <h2>{team.name}</h2>
          <div className="team-status-row">
            <span className={minimumReady ? "team-ready" : "team-waiting"}>
              {minimumReady ? "Minimum team size reached" : `Need ${TEAM_MIN_MEMBERS - members.length} more member${TEAM_MIN_MEMBERS - members.length === 1 ? "" : "s"}`}
            </span>
            <span>{members.length}/{TEAM_MAX_MEMBERS} members</span>
          </div>
        </div>

        <div className="team-code-card">
          <span>Team ID</span>
          <strong>{team.team_code}</strong>
          <button type="button" onClick={() => void copyTeamCode()}>
            {copied ? "Copied" : "Copy ID"}
          </button>
        </div>
      </header>

      <div className="team-dashboard-grid">
        <section className="team-members-card">
          <div className="portal-card-heading">
            <div>
              <p className="eyebrow">Team roster</p>
              <h3>Members</h3>
            </div>
            <span>{members.length}/{TEAM_MAX_MEMBERS}</span>
          </div>

          <div className="team-member-list">
            {members.map((member, index) => {
              const leader = member.user_id === team.leader_id;
              const current = member.user_id === userId;

              return (
                <div className="team-member-row" key={member.user_id}>
                  <span className="team-member-avatar" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <strong>{member.email}</strong>
                    <span>
                      {leader ? "Team leader" : "Team member"}
                      {current ? " · You" : ""}
                    </span>
                  </div>
                  {leader ? <b>Leader</b> : null}
                </div>
              );
            })}
          </div>

          <p className="team-member-note">
            Share <strong>{team.team_code}</strong> with participants you want to invite. A
            participant can join only one team.
          </p>
        </section>

        <section className="team-problem-card">
          <div className="portal-card-heading">
            <div>
              <p className="eyebrow">Challenge selection</p>
              <h3>Problem statement</h3>
            </div>
            <span>{selectedProblem ? selectedProblem.id : "Not selected"}</span>
          </div>

          {selectedProblem ? (
            <div className="selected-problem">
              <span>{selectedProblem.track} · {selectedProblem.type}</span>
              <h4>{selectedProblem.title}</h4>
              <p>{selectedProblem.summary}</p>
              <Link href={`/problem-statements/${selectedProblem.slug}`}>
                Open full problem statement <span aria-hidden="true">→</span>
              </Link>
            </div>
          ) : (
            <div className="problem-empty-state">
              <EventIcon name="document" />
              <strong>No problem statement selected yet.</strong>
              <span>
                {isLeader
                  ? "Choose one challenge below for your team."
                  : "Waiting for the team leader to choose a challenge."}
              </span>
            </div>
          )}

          {isLeader ? (
            <form className="problem-selection-form" onSubmit={handleProblemSelection}>
              <label htmlFor="team-problem">Team problem statement</label>
              <select
                id="team-problem"
                value={problemSlug}
                onChange={(event) => setProblemSlug(event.target.value)}
                required
              >
                <option value="">Select one of the 15 problems</option>
                {problemTracks.map((track) => (
                  <optgroup key={track} label={track}>
                    {problemStatements
                      .filter((problem) => problem.track === track)
                      .map((problem) => (
                        <option key={problem.slug} value={problem.slug}>
                          {problem.id} — {problem.title}
                        </option>
                      ))}
                  </optgroup>
                ))}
              </select>
              <button className="button" type="submit" disabled={!problemSlug || busyAction === "problem"}>
                {busyAction === "problem"
                  ? "Saving…"
                  : selectedProblem
                    ? "Update team problem"
                    : "Save team problem"}
              </button>
              <p>
                Only the team leader can set or change the team&apos;s problem statement.
              </p>
            </form>
          ) : null}
        </section>
      </div>
    </div>
  );
}
