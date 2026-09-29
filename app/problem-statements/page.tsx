import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/closing-cta";
import { EventIcon, type EventIconName } from "@/components/event-icons";
import { Header } from "@/components/header";
import {
  problemStatements,
  problemTracks,
  type ProblemStatement,
  type ProblemTrack,
} from "@/data/problem-statements";

export const metadata: Metadata = {
  title: "Problem Statements | BUILD THE FUTURE HACKATHON 2026",
  description:
    "Explore 15 hardware, software, drone, AI, and automation problem statements for BUILD THE FUTURE HACKATHON 2026.",
};

const trackMeta: Record<
  ProblemTrack,
  { icon: EventIconName; eyebrow: string; description: string }
> = {
  Drones: {
    icon: "drone",
    eyebrow: "Autonomous systems",
    description:
      "Flight autonomy, sensing, reliability, navigation, and multi-agent challenges for practical unmanned aerial systems.",
  },
  "AI Software": {
    icon: "brain",
    eyebrow: "Intelligent software",
    description:
      "Applied AI problems focused on trustworthy models, multimodal systems, edge intelligence, and production observability.",
  },
  Automation: {
    icon: "automation",
    eyebrow: "Connected automation",
    description:
      "Hardware-software systems that sense, decide, actuate, and improve real operational workflows.",
  },
};

function problemTypeClass(problem: ProblemStatement) {
  return `problem-type problem-type-${problem.type.toLowerCase()}`;
}

export default function ProblemStatementsPage() {
  return (
    <>
      <Header />
      <main className="problems-page">
        <section className="problems-hero">
          <div className="problem-grid-bg" aria-hidden="true" />
          <div className="shell problems-hero-content">
            <p className="eyebrow">BUILD THE FUTURE 2026</p>
            <h1>
              Problem <strong>Statements</strong>
            </h1>
            <p className="problems-hero-copy">
              Fifteen build-focused challenges across drones, AI software, and automation.
              Choose a problem, study the requirements, and design a solution that can be measured,
              demonstrated, and defended.
            </p>

            <div className="problem-stats" aria-label="Problem statement overview">
              <div><strong>15</strong><span>Problem statements</span></div>
              <div><strong>3</strong><span>Technology tracks</span></div>
              <div><strong>HW + SW</strong><span>Hardware, software & hybrid</span></div>
            </div>
          </div>
        </section>

        <section className="problem-track-overview">
          <div className="shell problem-track-overview-grid">
            {problemTracks.map((track) => {
              const meta = trackMeta[track];
              return (
                <a className={`problem-track-tile track-${track.toLowerCase().replace(/\s+/g, "-")}`} href={`#${track.toLowerCase().replace(/\s+/g, "-")}`} key={track}>
                  <span className="problem-track-icon"><EventIcon name={meta.icon} /></span>
                  <div>
                    <span>{meta.eyebrow}</span>
                    <strong>{track}</strong>
                  </div>
                  <b>{problemStatements.filter((problem) => problem.track === track).length}</b>
                </a>
              );
            })}
          </div>
        </section>

        {problemTracks.map((track) => {
          const meta = trackMeta[track];
          const problems = problemStatements.filter((problem) => problem.track === track);
          const sectionId = track.toLowerCase().replace(/\s+/g, "-");

          return (
            <section className="problem-track-section" id={sectionId} key={track}>
              <div className="shell">
                <div className="problem-track-heading">
                  <div>
                    <p className="eyebrow">{meta.eyebrow}</p>
                    <h2>{track}</h2>
                  </div>
                  <p>{meta.description}</p>
                </div>

                <div className="problem-card-grid">
                  {problems.map((problem) => (
                    <article className="problem-card" key={problem.slug}>
                      <div className="problem-card-topline">
                        <span className="problem-id">{problem.id}</span>
                        <span className={problemTypeClass(problem)}>{problem.type}</span>
                      </div>
                      <h3>{problem.title}</h3>
                      <p>{problem.summary}</p>
                      <div className="problem-card-meta">
                        <span>{problem.difficulty}</span>
                        <span>{problem.track}</span>
                      </div>
                      <div className="problem-card-actions">
                        <Link href={`/problem-statements/${problem.slug}`}>
                          Open problem <span aria-hidden="true">→</span>
                        </Link>
                        <a
                          className="problem-pdf-link"
                          href={`/problem-statements/${problem.slug}/pdf`}
                          download
                        >
                          PDF
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </main>
      <Footer />
    </>
  );
}
