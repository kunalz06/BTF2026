import type { Metadata } from "next";
import { Footer } from "@/components/closing-cta";
import { Header } from "@/components/header";
import { eventContent } from "@/data/event";

export const metadata: Metadata = {
  title: "Terms | BUILD THE FUTURE HACKATHON 2026",
  description:
    "Participation terms for BUILD THE FUTURE HACKATHON 2026.",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="legal-page">
        <section className="legal-hero">
          <div className="shell">
            <p className="eyebrow">BUILD THE FUTURE HACKATHON 2026</p>
            <h1>Terms</h1>
            <p>Last updated: 30 September 2026</p>
          </div>
        </section>

        <section className="legal-content">
          <div className="shell legal-layout">
            <aside className="legal-summary">
              <strong>Participation essentials</strong>
              <p>
                College students only. Teams contain 2–6 members. Registration and team formation
                happen through the portal. Project presentations are due 30 October 2026. Payment
                remains through campus GDG heads.
              </p>
            </aside>

            <article className="legal-document">
              <section>
                <h2>1. Eligibility</h2>
                <p>
                  BUILD THE FUTURE HACKATHON 2026 is open to college students. Participants may be
                  asked to provide reasonable proof of current student status.
                </p>
              </section>

              <section>
                <h2>2. Accounts and registration</h2>
                <p>
                  Each participant must create their own account using accurate information.
                  Participants are responsible for keeping their account credentials secure and
                  must not share passwords or impersonate another participant.
                </p>
              </section>

              <section>
                <h2>3. Teams</h2>
                <p>
                  Teams must contain between {eventContent.team.minMembers} and{" "}
                  {eventContent.team.maxMembers} participants. A participant may belong to only one
                  team. The participant who creates a team becomes its team leader by default. The
                  team ID may be shared with intended teammates so they can join.
                </p>
              </section>

              <section>
                <h2>4. Problem statement</h2>
                <p>
                  Each team must select exactly one problem statement through the Participation
                  portal. The team leader manages the team&apos;s problem selection.
                </p>
              </section>

              <section>
                <h2>5. Project presentation</h2>
                <p>
                  Each team must upload its project presentation through the Participation portal
                  by {eventContent.presentationDeadline.display}. The latest successful team upload
                  before the deadline is treated as the team&apos;s submitted presentation.
                </p>
                <p>
                  Teams are responsible for ensuring that submitted material is lawful, does not
                  contain malware, does not infringe third-party rights, and does not contain
                  confidential information they are not authorized to disclose.
                </p>
              </section>

              <section>
                <h2>6. Payment</h2>
                <p>
                  The participation fee is {eventContent.fee.display}. Payment is not collected
                  through the website and must be completed through the applicable campus GDG head
                  by {eventContent.paymentDeadline.display}. Registration in the portal does not by
                  itself confirm that payment has been completed.
                </p>
              </section>

              <section>
                <h2>7. Reporting and attendance</h2>
                <p>
                  Teams must report at {eventContent.venue.displayName} by{" "}
                  {eventContent.reporting.time} on {eventContent.reporting.display}. The offline
                  hackathon resumes on 31 October 2026, and the main event takes place on{" "}
                  {eventContent.date.display}. Participants are expected to follow venue, safety,
                  security, and organizer instructions.
                </p>
              </section>

              <section>
                <h2>8. Conduct</h2>
                <p>
                  Participants must behave professionally and respectfully. Harassment, deliberate
                  disruption, cheating, credential abuse, unauthorized system access, or dangerous
                  conduct may result in removal from the event or disqualification.
                </p>
              </section>

              <section>
                <h2>9. Intellectual property</h2>
                <p>
                  Teams retain ownership of original work they create, subject to any third-party
                  components, licenses, datasets, models, APIs, or materials they use. By
                  submitting a presentation or demonstrating a project, the team permits event
                  organizers to review and evaluate that material for hackathon administration,
                  judging, documentation, and event-related communication.
                </p>
              </section>

              <section>
                <h2>10. Prizes</h2>
                <p>
                  The announced total prize pool is {eventContent.prizes.totalPrizePoolDisplay}.
                  A {eventContent.prizes.featuredTopTeamPrizeDisplay} top-team prize amount is
                  listed for top teams from Hardware, Hybrid, and Software categories. Prize
                  eligibility remains subject to event rules, verification, judging outcomes, and
                  any category-specific conditions communicated by the organizers.
                </p>
              </section>

              <section>
                <h2>11. Event changes</h2>
                <p>
                  Organizers may make reasonable operational changes to schedules, sessions,
                  judging arrangements, venue procedures, or event logistics where necessary.
                  Updated information published on the event website should be treated as the
                  current event information.
                </p>
              </section>

              <section>
                <h2>12. Acceptance</h2>
                <p>
                  By creating an account or participating in the event, participants agree to
                  follow these Terms, the Privacy Policy, the published participation rules, and
                  reasonable organizer instructions connected with the event.
                </p>
              </section>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
