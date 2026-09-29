import Link from "next/link";
import { BrandLogo } from "@/components/brand-logos";
import { eventContent } from "@/data/event";

const navItems = [
  ["Home", "/#home"],
  ["About", "/#about"],
  ["Event", "/#event"],
  ["Problems", "/problem-statements"],
  ["Colleges", "/colleges"],
  ["Timeline", "/#timeline"],
  ["Rules", "/#rules"],
  ["FAQ", "/#faq"],
] as const;

export function Header() {
  return (
    <header className="site-header" aria-label="Primary navigation">
      <div className="shell nav-shell">
        <Link className="brand-bar" href="/" aria-label={`${eventContent.name} home`}>
          <BrandLogo brand="GitHub" />
          <span className="brand-divider" aria-hidden="true" />
          <BrandLogo brand="GDG India" />
          <span className="brand-divider" aria-hidden="true" />
          <BrandLogo brand="Google Cloud" />
        </Link>

        <nav className="desktop-nav" aria-label="Desktop navigation">
          {navItems.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>

        <Link className="button button-small desktop-cta" href="/#participate">
          Get Involved <span aria-hidden="true">→</span>
        </Link>

        <details className="mobile-nav">
          <summary aria-label="Open navigation">Menu</summary>
          <nav aria-label="Mobile navigation">
            {navItems.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
            <Link className="mobile-cta" href="/#participate">Get Involved</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
