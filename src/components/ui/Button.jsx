import { linkProps, isExternal } from "../../lib/links.js";
import Hand from "./Hand.jsx";
import Icon from "./Icon.jsx";

// variant: "solid" | "ghost". Pass href for a link, or onClick/type for a button.
export default function Button({ href, variant = "solid", hand = false, arrow, children, className = "", ...rest }) {
  const cls = `btn btn-${variant} ${className}`.trim();
  const content = (
    <>
      {hand ? <Hand /> : null}
      {children}
      {arrow ? <Icon name={arrow === true ? (isExternal(href) ? "out" : "caret") : arrow} /> : null}
    </>
  );
  if (href) {
    return (
      <a className={cls} {...linkProps(href)} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <button className={cls} type="button" {...rest}>
      {content}
    </button>
  );
}
