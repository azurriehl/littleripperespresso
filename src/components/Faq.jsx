import business from "../config/business.js";
import SectionHeading from "./ui/SectionHeading.jsx";

// Renders only when business.js has questions.
export default function Faq() {
  const { faq, faqTitle } = business;
  if (!faq.length) return null;
  return (
    <section className="faq" aria-labelledby="faq-title">
      <div className="wrap">
        <SectionHeading id="faq-title">{faqTitle}</SectionHeading>
        <div className="faq-list">
          {faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
