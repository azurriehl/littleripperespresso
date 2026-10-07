import business from "../config/business.js";
import ServiceCard from "./ui/ServiceCard.jsx";

export default function Services() {
  if (!business.services.length) return null;
  return (
    <nav className="tiles" aria-label="Ways to get your coffee">
      {business.services.map((s) => (
        <ServiceCard key={s.title} {...s} />
      ))}
    </nav>
  );
}
