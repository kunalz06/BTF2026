import { eventContent } from "@/data/event";

export function AboutSection() {
  return (
    <section className="section section-dark" id="about">
      <div className="shell split-layout">
        <div className="section-copy">
          <p className="eyebrow">About the event</p>
          <h2>{eventContent.about.heading}</h2>
          <p className="lead">{eventContent.about.body}</p>
          <div className="host-inline" aria-label="Joint hosts">
            {eventContent.hosts.map((host) => <span key={host.name}>{host.name}</span>)}
          </div>
        </div>
        <div className="feature-grid">
          {eventContent.about.features.map((feature, index) => (
            <article className="feature-card" key={feature.title}>
              <span className={`feature-number feature-number-${index + 1}`} aria-hidden="true">0{index + 1}</span>
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
