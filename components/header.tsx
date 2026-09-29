import { BrandLogo } from "@/components/brand-logos";
import { eventContent } from "@/data/event";

const navItems = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Event", "#event"],
  ["Timeline", "#timeline"],
  ["Rules", "#rules"],
  ["FAQ", "#faq"],
] as const;

export function Header() {
  return (
    <header className="site-header" aria-label="Primary navigation">
      <div className="shell nav-shell">
        <a className="brand-bar" href="#home" aria-label={`${eventContent.name} home`}>
          <BrandLogo brand="GitHub" />
          <span className="brand-divider" aria-hidden="true" />
          <BrandLogo brand="GDG India" />
          <span className="brand-divider" aria-hidden="true" />
          <BrandLogo brand="Google Cloud" />
        </a>

        <nav className="desktop-nav" aria-label="Desktop navigation">
          {navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>

        <a className="button button-small desktop-cta" href="#participate">
          Get Involved <span aria-hidden="true">→</span>
        </a>

        <details className="mobile-nav">
          <summary aria-label="Open navigation">Menu</summary>
          <nav aria-label="Mobile navigation">
            {navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
            <a className="mobile-cta" href="#participate">Get Involved</a>
          </nav>
        </details>
      </div>
    </header>
  );
}
