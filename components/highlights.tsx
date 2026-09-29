import { eventContent } from "@/data/event";

const symbols = ["</>", "✦", "◎", "↗"];

export function Highlights() {
  return (
    <section className="highlight-strip" aria-label="Event highlights">
      <div className="shell highlight-grid">
        {eventContent.highlights.map((item, index) => (
          <article className={`highlight-card accent-${item.accent}`} key={item.title}>
            <span className="highlight-symbol" aria-hidden="true">{symbols[index]}</span>
            <div><strong>{item.title}</strong><span>{item.subtitle}</span></div>
          </article>
        ))}
      </div>
    </section>
  );
}
