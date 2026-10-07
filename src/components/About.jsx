import business from "../config/business.js";
import Hand from "./ui/Hand.jsx";

export default function About() {
  const { about } = business;
  if (!about.statement) return null;
  return (
    <section className="statement" aria-label={about.label}>
      <div className="statement-in wrap">
        <p className="display">{about.statement}</p>
        <Hand />
      </div>
    </section>
  );
}
