import { BrandLogo } from "@/components/brand-logos";
import { EventIcon, type EventIconName } from "@/components/event-icons";
import { eventContent } from "@/data/event";

const ordered = [
  eventContent.keyInformation.find((item) => item.label === "Date")!,
  eventContent.keyInformation.find((item) => item.label === "Participation")!,
  eventContent.keyInformation.find((item) => item.label === "Format")!,
  eventContent.keyInformation.find((item) => item.label === "Hosted by")!,
];

const icons: EventIconName[] = ["calendar", "pin", "layers", "building"];

export function KeyInformation() {
  return (
    <section className="section section-light info-section" id="event">
      <div className="shell">
        <p className="eyebrow eyebrow-blue">Key information</p>
        <div className="section-heading-row">
          <h2>Event at a Glance</h2>
          <p>Everything confirmed for the 2026 event, presented clearly before you participate.</p>
        </div>

        <div className="info-grid">
          {ordered.map((item, index) => (
            <article className="info-card" key={item.label}>
              <span className={`info-icon info-icon-${index + 1}`}><EventIcon name={icons[index]} /></span>
              <h3>{item.label === "Hosted by" ? "Hosted By" : item.label}</h3>
              {item.label === "Hosted by" ? (
                <div className="info-hosts">
                  {eventContent.hosts.map((host) => <BrandLogo key={host.name} brand={host.name} />)}
                </div>
              ) : (
                <p>{item.value}</p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
