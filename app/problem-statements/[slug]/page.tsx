import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/closing-cta";
import { EventIcon } from "@/components/event-icons";
import { Header } from "@/components/header";
import { getProblemBySlug, problemStatements } from "@/data/problem-statements";

export function generateStaticParams() {
  return problemStatements.map((problem) => ({ slug: problem.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const problem = getProblemBySlug(slug);

  if (!problem) {
    return { title: "Problem Statement | BUILD THE FUTURE HACKATHON 2026" };
  }

  return {
    title: `${problem.id}: ${problem.title} | BUILD THE FUTURE HACKATHON 2026`,
    description: problem.summary,
  };
}

function DetailList({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <section className="problem-detail-section">
      <h2>{title}</h2>
      <ul>
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </section>
  );
}

export default async function ProblemStatementDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const problem = getProblemBySlug(slug);

  if (!problem) notFound();

  return (
    <>
      <Header />
      <main className="problem-detail-page">
        <section className="problem-detail-hero">
          <div className="problem-grid-bg" aria-hidden="true" />
          <div className="shell">
            <nav className="problem-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/problem-statements">Problem Statements</Link>
              <span>/</span>
              <b>{problem.id}</b>
            </nav>

            <div className="problem-detail-hero-grid">
              <div>
                <div className="problem-detail-badges">
                  <span className="problem-id">{problem.id}</span>
                  <span className={`problem-type problem-type-${problem.type.toLowerCase()}`}>
                    {problem.type}
                  </span>
                  <span className="problem-difficulty">{problem.difficulty}</span>
                </div>
                <p className="eyebrow">{problem.track}</p>
                <h1>{problem.title}</h1>
                <p className="problem-detail-summary">{problem.summary}</p>
                <div className="problem-detail-actions">
                  <a className="button" href={`/problem-statements/${problem.slug}/pdf`} download>
                    <EventIcon name="document" />
                    Download problem PDF
                  </a>
                  <Link className="text-link" href="/problem-statements">
                    All problem statements <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>

              <aside className="problem-brief-card" aria-label="Problem summary">
                <div><span>Track</span><strong>{problem.track}</strong></div>
                <div><span>Build type</span><strong>{problem.type}</strong></div>
                <div><span>Difficulty</span><strong>{problem.difficulty}</strong></div>
                <div><span>Reference</span><strong>{problem.id}</strong></div>
              </aside>
            </div>
          </div>
        </section>

        <section className="problem-detail-content">
          <div className="shell problem-detail-layout">
            <article className="problem-detail-main">
              <section className="problem-detail-section">
                <h2>Problem Context</h2>
                <p>{problem.problem}</p>
              </section>

              <section className="problem-detail-section problem-objective">
                <span>Objective</span>
                <p>{problem.objective}</p>
              </section>

              <DetailList title="Functional Requirements" items={problem.requirements} />
              <DetailList title="Constraints and Safety Boundaries" items={problem.constraints} />
              <DetailList title="Expected Deliverables" items={problem.deliverables} />
              <DetailList title="Evaluation Criteria" items={problem.evaluation} />
            </article>

            <aside className="problem-download-panel">
              <span className="problem-download-icon"><EventIcon name="document" /></span>
              <p className="eyebrow">Official brief</p>
              <h2>Take the problem statement with you.</h2>
              <p>
                Download the PDF version with the same scope, requirements, constraints,
                deliverables, and evaluation criteria shown on this page.
              </p>
              <a className="button" href={`/problem-statements/${problem.slug}/pdf`} download>
                Download PDF
              </a>
            </aside>
          </div>
        </section>

        <section className="problem-detail-next">
          <div className="shell">
            <p className="eyebrow">Explore more</p>
            <h2>Not your problem? Find another challenge.</h2>
            <Link className="button" href="/problem-statements">
              Browse all 15 problems <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
