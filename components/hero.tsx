import Link from "next/link";
import { EventIcon } from "@/components/event-icons";
import { eventContent } from "@/data/event";

export function Hero() {
  return (
    <section className="hero section" id="home">
      <div className="hero-grid" aria-hidden="true" />
      <div className="shell hero-layout">
        <div className="hero-copy">
          <p className="eyebrow">Annual Hackathon Plus Event</p>
          <h1>
            <span>BUILD THE</span>
            <strong>FUTURE</strong>
            <span>HACKATHON</span>
          </h1>
          <p className="hero-tagline">{eventContent.tagline}</p>
          <p className="hero-description">
            A flagship annual event jointly hosted by GitHub, GDG India, and Google Cloud,
            featuring a 36-hour hackathon, industry expert lectures, networking opportunities,
            and a community built around ambitious student ideas.
          </p>

          <div className="hero-meta" aria-label="Event quick facts">
            <div><EventIcon name="calendar" /><span>{eventContent.date.display}</span></div>
            <div><EventIcon name="pin" /><span>Details via college GDG teams</span></div>
          </div>

          <div className="hero-actions">
            <Link className="button" href="/#participate">Get Involved <span aria-hidden="true">→</span></Link>
            <Link className="text-link" href="/#rules">View participation rules <span aria-hidden="true">↘</span></Link>
          </div>
        </div>

        <div className="hero-stage" aria-hidden="true">
          <div className="hero-screen">
            <span className="screen-kicker">BUILD / CREATE / COLLABORATE</span>
            <strong>IDEAS</strong>
            <strong>PEOPLE</strong>
            <strong>TECHNOLOGY</strong>
            <span className="screen-footer">A BRIGHTER TOMORROW</span>
          </div>
          <div className="hero-codechip hero-codechip-one">&lt;/&gt;</div>
          <div className="hero-codechip hero-codechip-two">36H</div>
          <div className="hero-orbit" />
        </div>
      </div>
    </section>
  );
}
