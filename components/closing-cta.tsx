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
        <strong>{eventContent.name} 2026</strong>
        <span>{eventContent.hosts.map((host) => host.name).join(" · ")}</span>
        <span>Innovate · Collaborate · Build</span>
      </div>
    </footer>
  );
}
