import { BrandLogo } from "@/components/brand-logos";
import { eventContent } from "@/data/event";

export function HostsSection() {
  return (
    <section className="section hosts-section" aria-labelledby="hosts-heading">
      <div className="shell">
        <p className="eyebrow">Jointly hosted by</p>
        <h2 id="hosts-heading">Our Hosts</h2>
        <div className="hosts-grid">
          {eventContent.hosts.map((host) => (
            <article className="host-card" key={host.name}>
              <BrandLogo brand={host.name} className="host-brand" />
              <p>{host.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
