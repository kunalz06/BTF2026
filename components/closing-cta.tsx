import Link from "next/link";
import { BrandLogo } from "@/components/brand-logos";
import { eventContent } from "@/data/event";

export function ClosingCta() {
  return (
    <section className="closing-cta" id="participate">
      <div className="shell closing-content">
        <div>
          <p className="eyebrow">Let&apos;s build a brighter tomorrow</p>
          <h2>Are you ready to <strong>build the future?</strong></h2>
          <p>{eventContent.cta.body}</p>
        </div>
        <Link className="button" href="/participation">
          {eventContent.cta.actionLabel} <span aria-hidden="true">→</span>
        </Link>
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
