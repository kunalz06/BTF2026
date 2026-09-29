import { eventContent } from "@/data/event";

export function HostsSection() {
  return (
    <section className="section hosts-section" aria-labelledby="hosts-heading">
      <div className="shell">
        <p className="eyebrow">Jointly hosted by</p>
        <h2 id="hosts-heading">Our Hosts</h2>
        <div className="hosts-grid">
          {eventContent.hosts.map((host, index) => (
            <article className="host-card" key={host.name}>
              <span className={`host-monogram host-${index + 1}`} aria-hidden="true">{host.name.slice(0, 1)}</span>
              <h3>{host.name}</h3>
              <p>{host.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
