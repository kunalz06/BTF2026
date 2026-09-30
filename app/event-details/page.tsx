import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/closing-cta";
import { EventIcon } from "@/components/event-icons";
import { Header } from "@/components/header";
import { eventContent } from "@/data/event";
import { eventGuests, guestAttendanceNote } from "@/data/event-details";

export const metadata: Metadata = {
  title: "Event Details | BUILD THE FUTURE HACKATHON 2026",
  description:
    "Full event details for BUILD THE FUTURE HACKATHON 2026: reporting on 31 October, main event on 1 November, ITC Royal Bengal venue, industry guests, food, and prizes.",
};

export default function EventDetailsPage() {
  return (
    <>
      <Header />
      <main className="event-details-page">
        <section className="event-details-hero">
          <div className="event-details-grid-bg" aria-hidden="true" />
          <div className="shell event-details-hero-layout">
            <div>
              <p className="eyebrow">BUILD THE FUTURE 2026</p>
              <h1>
                Event <strong>Details</strong>
              </h1>
              <p className="event-details-lead">
                The offline hackathon resumes on 31 October 2026. Every team must report at
                ITC Royal Bengal by 4:00 PM, with the main event taking place on 1 November 2026.
              </p>
              <div className="event-details-chips" aria-label="Event highlights">
                <span>30 Oct · presentation due</span>
                <span>31 Oct · report by 4 PM</span>
                <span>1 Nov · main event</span>
                <span>36-hour hackathon</span>
                <span>Food included</span>
              </div>
            </div>

            <aside className="event-details-hero-card">
              <span className="event-details-hero-icon"><EventIcon name="calendar" /></span>
              <p className="eyebrow">At a glance</p>
              <div><span>Venue</span><strong>{eventContent.venue.displayName}</strong></div>
              <div><span>Reporting</span><strong>{eventContent.reporting.fullDisplay}</strong></div>
              <div><span>Main event</span><strong>{eventContent.date.display}</strong></div>
              <div><span>Total prize pool</span><strong>{eventContent.prizes.totalPrizePoolDisplay}</strong></div>
            </aside>
          </div>
        </section>

        <section className="event-logistics">
          <div className="shell">
            <div className="event-details-heading">
              <div>
                <p className="eyebrow eyebrow-blue">Schedule & logistics</p>
                <h2>Know when and where to report.</h2>
              </div>
              <p>
                Team reporting begins the offline event window. Keep your team together and arrive
                at the venue before the 4:00 PM reporting deadline.
              </p>
            </div>

            <div className="event-logistics-grid">
              <article className="event-logistics-card event-logistics-yellow">
                <span><EventIcon name="document" /></span>
                <p className="eyebrow">30 October 2026</p>
                <h3>Project Presentation</h3>
                <strong>Upload deadline</strong>
                <p>Each team must upload its project presentation through the Participation portal by this date.</p>
              </article>

              <article className="event-logistics-card event-logistics-blue">
                <span><EventIcon name="users" /></span>
                <p className="eyebrow">31 October 2026</p>
                <h3>Team Reporting</h3>
                <strong>Report by 4:00 PM</strong>
                <p>All participating teams must report at ITC Royal Bengal before the offline hackathon resumes.</p>
              </article>

              <article className="event-logistics-card event-logistics-red">
                <span><EventIcon name="code" /></span>
                <p className="eyebrow">31 October 2026</p>
                <h3>Offline Hackathon</h3>
                <strong>36-hour build format</strong>
                <p>The in-person hackathon continues after team reporting, leading into the main event program.</p>
              </article>

              <article className="event-logistics-card event-logistics-green">
                <span><EventIcon name="calendar" /></span>
                <p className="eyebrow">1 November 2026</p>
                <h3>Main Event</h3>
                <strong>Industry + hackathon program</strong>
                <p>Industry sessions, networking, hackathon activities, and prize programming take place at the venue.</p>
              </article>
            </div>

            <div className="event-venue-panel">
              <div>
                <p className="eyebrow eyebrow-blue">Venue</p>
                <h2>{eventContent.venue.displayName}</h2>
                <p>{eventContent.venue.address}</p>
              </div>
              <div className="event-venue-actions">
                <a className="button" href={eventContent.venue.mapsUrl} target="_blank" rel="noreferrer">
                  <EventIcon name="pin" />
                  Open in Maps
                </a>
                <a className="text-link" href={eventContent.venue.hotelUrl} target="_blank" rel="noreferrer">
                  Hotel website <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="event-guests-section">
          <div className="shell">
            <div className="event-details-heading event-details-heading-dark">
              <div>
                <p className="eyebrow">Industry leaders attending</p>
                <h2>Leadership from technology and industry.</h2>
              </div>
              <p>
                Attendance and appearance modes below are organizer-provided. Current public
                designations have been checked against the linked sources.
              </p>
            </div>

            <div className="event-guest-grid">
              {eventGuests.map((guest, index) => (
                <article className="event-guest-card" key={guest.name}>
                  <div
                    className="event-guest-photo"
                    role="img"
                    aria-label={guest.name + " portrait"}
                    style={{ backgroundImage: 'url("' + guest.imageUrl + '")' } as CSSProperties}
                  >
                    <span className={"guest-mode guest-mode-" + (guest.mode === "Online" ? "online" : "offline")}>
                      {guest.mode}
                    </span>
                  </div>
                  <div className="event-guest-body">
                    <span className="event-guest-index">{String(index + 1).padStart(2, "0")}</span>
                    <p className="event-guest-company">{guest.company}</p>
                    <h3>{guest.name}</h3>
                    <p className="event-guest-designation">{guest.designation}</p>
                    <div className="event-guest-appearance">
                      <EventIcon name={guest.mode === "Online" ? "network" : "users"} />
                      <span>{guest.appearance}</span>
                    </div>
                    <a href={guest.sourceUrl} target="_blank" rel="noreferrer">
                      Verify designation · {guest.sourceLabel} <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>

            <aside className="event-guest-note">
              <EventIcon name="info" />
              <div>
                <strong>Designation accuracy note</strong>
                <p>
                  {guestAttendanceNote} GitHub does not currently list a CEO. Thomas Dohmke stepped
                  down as GitHub CEO in 2025, so his card uses his current public designation rather
                  than presenting him as the current CEO.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className="event-prize-section">
          <div className="shell event-prize-layout">
            <div className="event-prize-copy">
              <p className="eyebrow eyebrow-blue">Prizes & hospitality</p>
              <h2>A major prize pool, plus food for participating teams.</h2>
              <p>
                Food is included for participants during the event. The announced total prize pool
                is {eventContent.prizes.totalPrizePoolDisplay}.
              </p>
              <div className="event-food-included">
                <span><EventIcon name="check" /></span>
                <div>
                  <strong>Food included</strong>
                  <p>Event food is included for participating teams.</p>
                </div>
              </div>
            </div>

            <div className="event-prize-cards">
              <article className="event-prize-card event-prize-card-primary">
                <span>Total prize pool</span>
                <strong>{eventContent.prizes.totalPrizePoolDisplay}</strong>
                <p>Across the BUILD THE FUTURE HACKATHON 2026 prize program.</p>
              </article>
              <article className="event-prize-card">
                <span>Top-team prize amount</span>
                <strong>{eventContent.prizes.featuredTopTeamPrizeDisplay}</strong>
                <p>{eventContent.prizes.featuredTopTeamPrizeScope} categories.</p>
              </article>
              <div className="event-prize-tracks" aria-label="Prize categories">
                <span>Hardware</span>
                <span>Hybrid</span>
                <span>Software</span>
              </div>
            </div>
          </div>
        </section>

        <section className="event-details-participate">
          <div className="shell">
            <div>
              <p className="eyebrow">Ready to participate?</p>
              <h2>Create your account and form your team.</h2>
              <p>
                Registration, team formation, and problem selection happen through the web portal.
                Payment remains through your campus GDG head.
              </p>
            </div>
            <Link className="button" href="/participation">
              Open Participation Portal <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
