import business from "../config/business.js";
import { linkProps, isExternal } from "../lib/links.js";
import Hand from "./ui/Hand.jsx";
import Icon from "./ui/Icon.jsx";

export default function Footer() {
  const { signoff, footer, hero, name, address, phone, email, hours, hoursLabel } = business;
  const year = new Date().getFullYear();
  return (
    <>
      {signoff ? (
        <section className="band" aria-label="Sign-off">
          <p className="display">{signoff}</p>
        </section>
      ) : null}
      <footer className="footer">
        <div className="wrap">
          <div className="footer-mark" aria-hidden="true">
            <span className="display">
              {hero.wordmark.map((word, i) => (
                <span className="w" key={word}>
                  {word}
                  {i < hero.wordmark.length - 1 ? " " : ""}
                </span>
              ))}
            </span>
            <Hand />
          </div>
          <div className="footer-row">
            {footer.links.map((l) => (
              <a key={l.label} {...linkProps(l.href)}>
                {l.label} <Icon name={isExternal(l.href) ? "out" : "caret"} />
              </a>
            ))}
          </div>
          <p className="small">
            © {year} {name}, {address.line1}, {address.line2}.
            {phone.display ? ` Call or text ${phone.display}.` : ""}
            {email ? ` Email ${email}.` : ""}
            {hours.length
              ? ` ${hoursLabel}: ${hours.map((h) => `${h.days} ${h.time.charAt(0).toLowerCase() + h.time.slice(1)}`).join(", ")}.`
              : ""}
          </p>
        </div>
      </footer>
    </>
  );
}
