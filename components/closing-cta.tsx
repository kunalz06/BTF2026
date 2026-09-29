import { BrandLogo } from "@/components/brand-logos";
import { eventContent } from "@/data/event";

export function ClosingCta() {
  return (
    <section className="closing-cta" id="participate">
      <div className="closing-grid" aria-hidden="true" />
      <div className="shell closing-content">
        <div>
          <p className="eyebrow">Let&apos;s build a brighter tomorrow</p>
          <h2>{eventContent.cta.heading}</h2>
          <p>{eventContent.cta.body}</p>
        </div>
        <a className="button button-light" href="#rules">{eventContent.cta.actionLabel}</a>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-row">
        <div className="footer-brands" aria-label="Event hosts">
          {eventContent.hosts.map((host) => <BrandLogo key={host.name} brand={host.name} />)}
        </div>
        <strong>{eventContent.name} 2026</strong>
        <span>Innovate · Collaborate · Build</span>
      </div>
    </footer>
  );
}
