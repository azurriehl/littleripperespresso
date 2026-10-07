import { linkProps, isExternal } from "../../lib/links.js";
import Icon from "./Icon.jsx";

// One of the four bordered tiles under the hero.
export default function ServiceCard({ title, text, note, href }) {
  return (
    <a className="tile" {...linkProps(href)}>
      <span className="tile-head display">
        {title} <Icon name={isExternal(href) ? "out" : "caret"} />
      </span>
      <p>
        {text}
        {note ? <> <span className="tile-ext">{note}</span></> : null}
      </p>
    </a>
  );
}
