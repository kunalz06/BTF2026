import { EventIcon, type EventIconName } from "@/components/event-icons";
import { eventContent } from "@/data/event";

const icons: EventIconName[] = ["document", "calendar", "users", "trophy"];

export function TimelineSection() {
  return (
    <section className="section timeline-section" id="timeline">
      <div className="shell">
        <p className="eyebrow eyebrow-blue">Important dates</p>
        <h2>Event Timeline</h2>

        <div className="timeline" role="list">
          {eventContent.timeline.map((item, index) => (
            <article className="timeline-item" role="listitem" key={item.title}>
              <div className="timeline-dot"><EventIcon name={icons[index]} /></div>
              <h3>{item.title}</h3>
              <p className="timeline-value">{item.value}</p>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
