import type { Metadata } from "next";
import { Footer } from "@/components/closing-cta";
import { Header } from "@/components/header";
import { ParticipationClient } from "@/components/participation-client";

export const metadata: Metadata = {
  title: "Participation | BUILD THE FUTURE HACKATHON 2026",
  description:
    "Create your participant account, create or join a team, view teammates, share your 7-character team ID, and select a BUILD THE FUTURE HACKATHON 2026 problem statement.",
};

export default function ParticipationPage() {
  return (
    <>
      <Header />
      <main className="participation-page">
        <section className="participation-hero">
          <div className="participation-grid-bg" aria-hidden="true" />
          <div className="shell participation-hero-content">
            <p className="eyebrow">Participant portal · BUILD THE FUTURE 2026</p>
            <h1>
              Build your team. <strong>Choose your challenge.</strong>
            </h1>
            <p>
              Create your participant account, start a team or join one with a shared team ID,
              then select the problem statement your team will build during the hackathon.
            </p>
            <div className="participation-rules-strip">
              <span>1 account = 1 team</span>
              <span>2–6 members per team</span>
              <span>7-character team ID</span>
              <span>1 problem statement per team</span>
              <span>Payment via campus GDG head</span>
            </div>
          </div>
        </section>

        <ParticipationClient />
      </main>
      <Footer />
    </>
  );
}
