import { eventContent } from "@/data/event";

export function FaqSection() {
  return (
    <section className="section faq-section" id="faq">
      <div className="shell faq-layout">
        <div className="faq-heading">
          <p className="eyebrow">FAQ</p>
          <h2>Questions, answered.</h2>
          <p>Only confirmed event information is shown here.</p>
        </div>
        <div className="faq-list">
          {eventContent.faq.map((item, index) => (
            <details key={item.question} open={index === 0}>
              <summary>{item.question}<span aria-hidden="true">+</span></summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
