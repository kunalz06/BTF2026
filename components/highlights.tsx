import { EventIcon, type EventIconName } from "@/components/event-icons";
import { eventContent } from "@/data/event";

const iconMap: EventIconName[] = ["code", "users", "network", "trophy"];

export function Highlights() {
  return (
    <section className="highlight-strip" aria-label="Event highlights">
      <div className="shell highlight-grid">
        {eventContent.highlights.map((item, index) => (
          <article className={`highlight-card accent-${item.accent}`} key={item.title}>
            <span className="highlight-symbol"><EventIcon name={iconMap[index]} /></span>
            <div>
              <strong>{item.title}</strong>
              <span>{item.subtitle}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
