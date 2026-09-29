import { BrandLogo } from "@/components/brand-logos";
import { eventContent } from "@/data/event";

export function KeyInformation() {
  return (
    <section className="section section-light" id="event">
      <div className="shell">
        <p className="eyebrow eyebrow-blue">Event details</p>
        <div className="section-heading-row"><h2>Key Information</h2><p>Everything confirmed for the 2026 event, at a glance.</p></div>
        <div className="info-grid">
          {eventContent.keyInformation.map((item, index) => (
            <article className="info-card" key={item.label}>
              <span className="info-index" aria-hidden="true">0{index + 1}</span>
              <h3>{item.label}</h3>
              {item.label === "Hosted by" ? (
                <div className="info-hosts" aria-label="Event hosts">
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
