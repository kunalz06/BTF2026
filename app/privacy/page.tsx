import type { Metadata } from "next";
import { Footer } from "@/components/closing-cta";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Privacy Policy | BUILD THE FUTURE HACKATHON 2026",
  description:
    "Privacy information for participants using the BUILD THE FUTURE HACKATHON 2026 website and participation portal.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="legal-page">
        <section className="legal-hero">
          <div className="shell">
            <p className="eyebrow">BUILD THE FUTURE HACKATHON 2026</p>
            <h1>Privacy Policy</h1>
            <p>Last updated: 30 September 2026</p>
          </div>
        </section>

        <section className="legal-content">
          <div className="shell legal-layout">
            <aside className="legal-summary">
              <strong>In short</strong>
              <p>
                We collect the information needed to operate participant accounts, teams,
                submissions, event logistics, and communication. Payment is handled separately
                through campus GDG heads and is not processed through this website.
              </p>
            </aside>

            <article className="legal-document">
              <section>
                <h2>1. Information we collect</h2>
                <p>
                  When you use the Participation portal, we may collect your full name, email
                  address, account identifiers, team membership, team name, team ID, selected
                  problem statement, project presentation, submission metadata, and timestamps.
                </p>
                <p>
                  We may also receive ordinary technical information required to operate and secure
                  the website, such as request logs, browser information, device information,
                  security events, and error logs.
                </p>
              </section>

              <section>
                <h2>2. How we use information</h2>
                <p>
                  We use participant information to create and maintain accounts, enforce team
                  rules, display teammates, manage problem selections, receive project
                  presentations, administer the hackathon, support judging and event operations,
                  communicate relevant event information, prevent abuse, and maintain website
                  security.
                </p>
              </section>

              <section>
                <h2>3. Team information</h2>
                <p>
                  Team members can see the names and email addresses of other members of their
                  team, the team leader, team ID, selected problem statement, and team submission
                  status. A participant can belong to only one team.
                </p>
              </section>

              <section>
                <h2>4. Project presentations</h2>
                <p>
                  Project presentations uploaded through the Participation portal are stored using
                  a cloud file-storage service and linked to the submitting team. They may be
                  accessed by event organizers, reviewers, judges, and authorized technical
                  service providers as needed to run the event.
                </p>
                <p>
                  Teams should not include passwords, financial information, private credentials,
                  unnecessary personal data, or confidential third-party information in their
                  presentation.
                </p>
              </section>

              <section>
                <h2>5. Payments</h2>
                <p>
                  The website does not process the ₹4,500 participation fee. Payment remains
                  handled separately through the applicable campus GDG head or the nearest
                  participating college GDG where required. Payment information collected outside
                  this website is governed by the process used by those organizers.
                </p>
              </section>

              <section>
                <h2>6. Service providers</h2>
                <p>
                  We use third-party infrastructure and service providers for website hosting,
                  account authentication, database storage, file storage, delivery, monitoring,
                  and security. These providers may process information only as required to provide
                  those services and according to their applicable terms and privacy practices.
                </p>
              </section>

              <section>
                <h2>7. Data retention</h2>
                <p>
                  Participant and submission information may be retained for as long as reasonably
                  necessary for event administration, judging, records, security, dispute
                  resolution, and legal or operational requirements. Data may later be archived,
                  anonymized, or deleted when it is no longer needed.
                </p>
              </section>

              <section>
                <h2>8. Security</h2>
                <p>
                  We use technical and organizational controls intended to protect participant
                  information, including account authentication and access controls. No internet
                  service can guarantee absolute security, so participants should use strong,
                  unique passwords and protect their account credentials.
                </p>
              </section>

              <section>
                <h2>9. Participant choices</h2>
                <p>
                  Participants may contact the event organizers through their campus GDG head for
                  questions about event records, corrections, or account-related concerns. Some
                  information may need to be retained where required for event administration,
                  security, or legal obligations.
                </p>
              </section>

              <section>
                <h2>10. Changes to this policy</h2>
                <p>
                  This policy may be updated when event processes or website features change.
                  Material changes will be reflected on this page together with an updated date.
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
