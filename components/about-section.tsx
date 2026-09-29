import { BrandLogo } from "@/components/brand-logos";
import { EventIcon, type EventIconName } from "@/components/event-icons";
import { eventContent } from "@/data/event";

const icons: EventIconName[] = ["building", "users", "code"];

export function AboutSection() {
  return (
    <section className="section section-dark about-section" id="about">
      <div className="shell">
        <div className="about-top">
          <div className="section-copy">
            <p className="eyebrow">About the event</p>
            <h2>{eventContent.about.heading}</h2>
            <p className="lead">
              Build the Future Hackathon brings student innovators together with industry voices,
              developer communities, and cloud technology for an experience designed around learning,
              connection, and practical building.
            </p>
            <p className="lead lead-secondary">
              It&apos;s more than a hackathon — it&apos;s a complete experience with expert lectures,
              networking opportunities, hands-on collaboration, and a 36-hour sprint to turn ideas into real outcomes.
            </p>
          </div>

          <div className="about-visual" aria-label="Joint event hosts">
            <div className="about-glow" aria-hidden="true" />
            <div className="laptop">
              <div className="laptop-screen">
                <div className="laptop-brands">
                  {eventContent.hosts.map((host) => <BrandLogo key={host.name} brand={host.name} label={false} />)}
                </div>
                <span>INNOVATE</span>
                <span>COLLABORATE</span>
                <span>BUILD WHAT&apos;S NEXT</span>
              </div>
              <div className="laptop-base" />
            </div>
          </div>
        </div>

        <div className="feature-grid">
          {eventContent.about.features.map((feature, index) => (
            <article className="feature-card" key={feature.title}>
              <span className={`feature-icon feature-icon-${index + 1}`}><EventIcon name={icons[index]} /></span>
              <div>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </div>
              <span className="feature-arrow" aria-hidden="true">›</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
