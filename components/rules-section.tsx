import { eventContent } from "@/data/event";

export function RulesSection() {
  return (
    <section className="section section-dark" id="rules">
      <div className="shell">
        <p className="eyebrow">Team registration rules</p>
        <div className="section-heading-row section-heading-dark"><h2>Team Guidelines</h2><p>Simple rules, clearly stated before you participate.</p></div>
        <div className="rules-grid">
          {eventContent.rules.map((rule, index) => (
            <article className="rule-card" key={rule.title}>
              <span className="rule-icon" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3>{rule.title}</h3>
              <p>{rule.value}</p>
            </article>
          ))}
        </div>
        <div className="eligibility-banner" role="note">
          <span aria-hidden="true">i</span>
          <strong>This event is only for college students.</strong>
        </div>
      </div>
    </section>
  );
}
