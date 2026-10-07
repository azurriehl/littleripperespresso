import business from "../config/business.js";
import SectionHeading from "./ui/SectionHeading.jsx";

// Renders only when business.js has real testimonials.
export default function Testimonials() {
  const { testimonials, testimonialsTitle } = business;
  if (!testimonials.length) return null;
  return (
    <section className="quotes" aria-labelledby="quotes-title">
      <div className="wrap">
        <SectionHeading id="quotes-title">{testimonialsTitle}</SectionHeading>
        <ul className="quote-list">
          {testimonials.map((t) => (
            <li key={t.quote}>
              <blockquote>“{t.quote}”</blockquote>
              <p>
                {t.name}
                {t.detail ? `, ${t.detail}` : ""}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
