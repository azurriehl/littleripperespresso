import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import business from "./config/business.js";
import App from "./App.jsx";
import "./styles/global.css";

// Copy the brand colours from business.js into CSS variables before first paint.
const c = business.colors;
const root = document.documentElement;
const vars = {
  "--brand-apricot": c.apricot,
  "--brand-cream": c.cream,
  "--brand-toast": c.toast,
  "--brand-on-apricot": c.onApricot,
  "--brand-ink-soft": c.inkSoft,
  "--brand-dark-paper": c.dark.paper,
  "--brand-dark-ink": c.dark.ink,
  "--brand-dark-ink-soft": c.dark.inkSoft,
  "--brand-dark-deep": c.dark.deep,
};
for (const [k, v] of Object.entries(vars)) root.style.setProperty(k, v);

// Page title, description and browser colour also come from business.js.
document.title = business.seo.title;
document.querySelector('meta[name="description"]')?.setAttribute("content", business.seo.description);
document.querySelector('meta[name="theme-color"]')?.setAttribute("content", c.apricot);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
