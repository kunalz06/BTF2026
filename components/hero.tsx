import { EventPoster } from "@/components/event-poster";
import { eventContent } from "@/data/event";
import { getEventAssetUrl } from "@/lib/asset-url";

export function Hero() {
  const posterUrl = getEventAssetUrl("poster-2026.svg");

  return (
    <section className="hero section" id="home">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow hero-glow-one" aria-hidden="true" />
      <div className="hero-glow hero-glow-two" aria-hidden="true" />
      <div className="shell hero-layout">
        <div className="hero-copy">
          <p className="eyebrow">{eventContent.eyebrow}</p>
          <h1>
            <span>BUILD THE</span>
            <strong>FUTURE</strong>
            <span>HACKATHON</span>
          </h1>
          <p className="hero-tagline">{eventContent.tagline}</p>
          <p className="hero-description">{eventContent.description}</p>
          <div className="hero-meta" aria-label="Event quick facts">
            <div><span className="meta-icon" aria-hidden="true">◫</span><span>{eventContent.date.display}</span></div>
            <div><span className="meta-icon" aria-hidden="true">◎</span><span>Details via college GDG teams</span></div>
          </div>
          <div className="hero-actions">
            <a className="button" href="#participate">Get Involved</a>
            <a className="text-link" href="#rules">View participation rules <span aria-hidden="true">→</span></a>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="future-panel">
            <span className="panel-kicker">BUILD / COLLABORATE / CREATE</span>
            <strong>IDEAS<br />PEOPLE<br />TECHNOLOGY</strong>
            <span>A BRIGHTER TOMORROW</span>
          </div>
          <div className="cityline">
            {Array.from({ length: 11 }).map((_, index) => <i key={index} style={{ "--i": index } as React.CSSProperties} />)}
          </div>
          <div className="developer-row">
            <span>&lt;/&gt;</span><span>01</span><span>◆</span><span>36H</span><span>∞</span>
          </div>
          <EventPoster remoteSrc={posterUrl} className="hero-poster" />
        </div>
      </div>
    </section>
  );
}
