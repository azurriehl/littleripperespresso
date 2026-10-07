import business from "../config/business.js";
import { linkProps } from "../lib/links.js";
import Hand from "./ui/Hand.jsx";
import Icon from "./ui/Icon.jsx";

export default function Hero() {
  const { hero, nav } = business;
  return (
    <section className="hero" id="top" aria-label={business.name}>
      <div className="stage wrap">
        <h1 className="wordmark display" translate="no">
          {hero.wordmark.map((word, i) => (
            <span className="w" key={word}>
              {word}
              {i < hero.wordmark.length - 1 ? " " : ""}
            </span>
          ))}
          <span className="sr-only"> {hero.wordmarkSuffix}</span>
        </h1>
        <div className="hero-hand" aria-hidden="true">
          <Hand />
        </div>
        <a className="sticker" {...linkProps(nav.cta.href)}>
          <span>
            <Hand />
            {hero.sticker}
          </span>
        </a>
      </div>
      <div className="hero-foot wrap">
        <p className="lede">{hero.lede}</p>
        <div className="foot-links">
          {hero.links.map((l) => (
            <a key={l.label} className="foot-link" {...linkProps(l.href)}>
              {l.label} <Icon name="caret" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
