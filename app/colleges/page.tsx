import type { Metadata } from "next";
import { BrandLogo } from "@/components/brand-logos";
import { Footer } from "@/components/closing-cta";
import { EventIcon } from "@/components/event-icons";
import { Header } from "@/components/header";
import {
  gdgCollegeRegions,
  gdgColleges,
  gdgDirectoryVerifiedOn,
  getCollegeMapsUrl,
} from "@/data/gdg-colleges";

export const metadata: Metadata = {
  title: "Colleges with On-Campus GDGs | BUILD THE FUTURE HACKATHON 2026",
  description:
    "Verified West Bengal colleges with GDG on Campus chapters for Build the Future Hackathon 2026, with locations and official GDG links.",
};

export default function CollegesPage() {
  return (
    <>
      <Header />
      <main className="colleges-page">
        <section className="colleges-hero">
          <div className="colleges-grid-bg" aria-hidden="true" />
          <div className="shell colleges-hero-layout">
            <div>
              <p className="eyebrow">Participation network · West Bengal</p>
              <h1>
                Colleges with <strong>On-Campus GDGs</strong>
              </h1>
              <p className="colleges-hero-copy">
                A current verified directory of West Bengal college and university GDG on Campus
                chapters for BUILD THE FUTURE HACKATHON 2026. Use the location attached to each
                chapter to identify the nearest participating GDG.
              </p>
              <div className="colleges-stats" aria-label="GDG college directory overview">
                <div><strong>{gdgColleges.length}</strong><span>verified college GDGs</span></div>
                <div><strong>{gdgCollegeRegions.length}</strong><span>regional groups</span></div>
                <div><strong>{gdgDirectoryVerifiedOn}</strong><span>directory verified</span></div>
              </div>
            </div>

            <div className="colleges-hero-mark" aria-label="GDG India">
              <BrandLogo brand="GDG India" />
              <span className="colleges-orbit colleges-orbit-one" aria-hidden="true" />
              <span className="colleges-orbit colleges-orbit-two" aria-hidden="true" />
              <div className="colleges-hero-pin" aria-hidden="true"><EventIcon name="pin" /></div>
            </div>
          </div>
        </section>

        <section className="external-college-rule">
          <div className="shell external-college-rule-card">
            <span className="external-college-icon"><EventIcon name="network" /></span>
            <div>
              <p className="eyebrow">Your college does not have a GDG?</p>
              <h2>Contact the nearest college GDG to participate.</h2>
              <p>
                If your team&apos;s college does not have a GDG on Campus, your team must contact
                the nearest college listed on this page that has a GDG. That college&apos;s GDG
                team will guide your team through participation and registration for this event.
                Use the attached location button to identify the closest chapter, then open its
                official GDG page to contact the organizers.
              </p>
            </div>
          </div>
        </section>

        <section className="colleges-directory">
          <div className="shell">
            <div className="colleges-directory-heading">
              <div>
                <p className="eyebrow">Verified directory</p>
                <h2>COLLEGES WITH ON-CAMPUS GDGs</h2>
              </div>
              <p>
                Every entry below is backed by an official Google Developer Groups chapter page
                or a recent official GDG on Campus event page. Chapter rosters can change, so use
                the linked GDG page as the final contact point.
              </p>
            </div>

            <nav className="college-region-nav" aria-label="College regions">
              {gdgCollegeRegions.map((region) => (
                <a key={region} href={`#${region.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                  {region}
                  <span>{gdgColleges.filter((college) => college.region === region).length}</span>
                </a>
              ))}
            </nav>

            {gdgCollegeRegions.map((region) => {
              const colleges = gdgColleges.filter((college) => college.region === region);
              const id = region.toLowerCase().replace(/[^a-z0-9]+/g, "-");

              return (
                <section className="college-region-section" id={id} key={region}>
                  <div className="college-region-title">
                    <div>
                      <span>{String(colleges.length).padStart(2, "0")}</span>
                      <h3>{region}</h3>
                    </div>
                    <p>GDG on Campus chapters verified for this West Bengal region.</p>
                  </div>

                  <div className="college-card-grid">
                    {colleges.map((college, index) => (
                      <article className="college-card" key={college.name}>
                        <div className="college-card-header">
                          <span className="college-index">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="college-gdg-badge">GDG on Campus</span>
                        </div>

                        <div className="college-card-logo" aria-hidden="true">
                          <BrandLogo brand="GDG India" label={false} />
                        </div>

                        <p className="college-shortname">{college.shortName}</p>
                        <h3>{college.name}</h3>

                        <div className="college-location">
                          <EventIcon name="pin" />
                          <span>{college.location}</span>
                        </div>

                        <p className="college-verification">{college.verification}</p>

                        <div className="college-actions">
                          <a
                            href={getCollegeMapsUrl(college)}
                            target="_blank"
                            rel="noreferrer"
                            className="college-map-link"
                          >
                            <EventIcon name="pin" />
                            Location
                          </a>
                          <a
                            href={college.gdgUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="college-gdg-link"
                          >
                            Official GDG <span aria-hidden="true">↗</span>
                          </a>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              );
            })}

            <aside className="college-source-note">
              <EventIcon name="info" />
              <p>
                <strong>Verification note:</strong> directory checked on {gdgDirectoryVerifiedOn}
                against official Google Developer Groups chapter pages and recent official GDG on
                Campus event pages surfaced during the current web search. GDG chapter availability
                and organizer teams can change over time.
              </p>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
