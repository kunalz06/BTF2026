import Link from "next/link";
import { EventIcon } from "@/components/event-icons";
import { eventContent } from "@/data/event";

export function RulesSection() {
  return (
    <section className="section section-dark rules-section" id="rules">
      <div className="shell">
        <p className="eyebrow">Participation rules & regulations</p>
        <div className="section-heading-row section-heading-dark">
          <h2>Registration & Team Guidelines</h2>
          <p>
            Registration and team formation happen through the web portal. Payments are handled
            separately through campus GDG heads.
          </p>
        </div>

        <div className="rules-grid">
          <article className="rule-card">
            <span className="rule-icon rule-purple"><EventIcon name="document" /></span>
            <h3>Account Registration</h3>
            <p>
              Every participant must create their own account in the{" "}
              <Link href="/participation">Participation portal</Link>.
            </p>
          </article>

          <article className="rule-card">
            <span className="rule-icon rule-violet"><EventIcon name="users" /></span>
            <h3>Team Formation</h3>
            <p>
              Create a new team or join one with its 7-character team ID. Teams must have{" "}
              {eventContent.team.minMembers}–{eventContent.team.maxMembers} members.
            </p>
          </article>

          <article className="rule-card">
            <span className="rule-icon rule-blue"><EventIcon name="network" /></span>
            <h3>One Team Per Participant</h3>
            <p>
              Each participant can belong to only one team. Once joined, that account cannot join
              another team.
            </p>
          </article>

          <article className="rule-card">
            <span className="rule-icon rule-gold"><EventIcon name="crown" /></span>
            <h3>Team Leader</h3>
            <p>
              The participant who creates the team becomes the team leader by default.
            </p>
          </article>

          <article className="rule-card">
            <span className="rule-icon rule-green"><EventIcon name="document" /></span>
            <h3>Problem Statement</h3>
            <p>
              Every team must select exactly one problem statement in the portal. The team leader
              manages the team&apos;s problem selection.
            </p>
          </article>

          <article className="rule-card">
            <span className="rule-icon rule-blue"><EventIcon name="document" /></span>
            <h3>Project Presentation</h3>
            <p>
              The team leader must upload the team project presentation through the portal by{" "}
              {eventContent.presentationDeadline.display}. Only the team leader can replace it.
            </p>
          </article>

          <article className="rule-card">
            <span className="rule-icon rule-pink"><EventIcon name="rupee" /></span>
            <h3>Fee & Payment</h3>
            <p>
              <strong>{eventContent.fee.display}</strong>. Payment is made through your campus GDG
              head by {eventContent.paymentDeadline.display}; it is not collected through the portal.
            </p>
          </article>
        </div>

        <div className="eligibility-banner" role="note">
          <EventIcon name="info" />
          <div>
            <strong>This event is only for college students.</strong>
            <span>
              If your college has no GDG on Campus, register and form your team in the portal,
              then <Link href="/colleges">contact the nearest listed college GDG</Link> for payment coordination.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
