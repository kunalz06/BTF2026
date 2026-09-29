import { EventIcon } from "@/components/event-icons";
import { eventContent } from "@/data/event";

export function RulesSection() {
  return (
    <section className="section section-dark rules-section" id="rules">
      <div className="shell">
        <p className="eyebrow">Team registration rules</p>
        <div className="section-heading-row section-heading-dark">
          <h2>Team Guidelines</h2>
          <p>Four things every participating team should know before payment.</p>
        </div>

        <div className="rules-grid">
          <article className="rule-card">
            <span className="rule-icon rule-purple"><EventIcon name="users" /></span>
            <h3>Team Size</h3>
            <p>Minimum {eventContent.team.minMembers} members<br />Maximum {eventContent.team.maxMembers} members</p>
          </article>
          <article className="rule-card">
            <span className="rule-icon rule-violet"><EventIcon name="crown" /></span>
            <h3>Team Lead</h3>
            <p>{eventContent.team.leadRule}.</p>
          </article>
          <article className="rule-card">
            <span className="rule-icon rule-pink"><EventIcon name="rupee" /></span>
            <h3>Registration Fee</h3>
            <p><strong>{eventContent.fee.display}</strong><br />Last date of payment: {eventContent.paymentDeadline.display}</p>
          </article>
          <article className="rule-card">
            <span className="rule-icon rule-green"><EventIcon name="document" /></span>
            <h3>How to Participate</h3>
            <p>{eventContent.participationGuidance}</p>
          </article>
        </div>

        <div className="eligibility-banner" role="note">
          <EventIcon name="info" />
          <strong>This event is only for college students.</strong>
        </div>
      </div>
    </section>
  );
}
