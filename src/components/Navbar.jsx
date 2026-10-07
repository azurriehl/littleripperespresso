import { useEffect, useRef, useState } from "react";
import business from "../config/business.js";
import { linkProps } from "../lib/links.js";
import Icon from "./ui/Icon.jsx";

export default function Navbar() {
  const { nav, shortName, phone } = business;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sentinel = useRef(null);
  const toggle = useRef(null);

  // Slightly firmer edge once the page scrolls, without a scroll listener.
  useEffect(() => {
    const el = sentinel.current;
    if (!el || !("IntersectionObserver" in window)) return undefined;
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Close the mobile menu on Escape and when the screen grows past phone width.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onWide = (e) => e.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onWide);
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onWide);
    };
  }, [open]);

  const close = () => setOpen(false);
  const panelLinks = [...nav.links, { label: `${nav.callLabel} ${phone.display}`, href: "call" }, nav.cta];

  return (
    <>
      <div ref={sentinel} aria-hidden="true" style={{ height: 1, marginBottom: -1 }} />
      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <nav className="nav wrap" aria-label="Main">
          <a className="brand" href="#top" translate="no">
            {shortName}
          </a>
          <ul className="nav-links">
            {nav.links.map((l) => (
              <li key={l.href} className="nav-text">
                <a {...linkProps(l.href)}>{l.label}</a>
              </li>
            ))}
            <li>
              <a className="btn btn-solid" {...linkProps(nav.cta.href)}>
                {nav.cta.label}
              </a>
            </li>
            <li>
              <button
                ref={toggle}
                type="button"
                className="menu-toggle"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? nav.closeLabel : nav.menuLabel}
                onClick={() => setOpen((o) => !o)}
              >
                <Icon name={open ? "close" : "list"} className="" />
              </button>
            </li>
          </ul>
        </nav>
        <div className="mobile-panel" id="mobile-menu" hidden={!open}>
          <ul className="wrap">
            {panelLinks.map((l) => (
              <li key={l.label}>
                <a className="display" {...linkProps(l.href)} onClick={close}>
                  {l.label} <Icon name="caret" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </>
  );
}
