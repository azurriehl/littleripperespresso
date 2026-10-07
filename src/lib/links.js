import business from "../config/business.js";

// Turns the shorthand hrefs used in business.js into real links.
export function resolveHref(href) {
  const { phone, links, email } = business;
  switch (href) {
    case "call":
      return `tel:${phone.international}`;
    case "sms":
      return `sms:${phone.international}`;
    case "email":
      return `mailto:${email}`;
    case "directions":
      return links.directions;
    case "uberEats":
      return links.uberEats;
    case "instagram":
      return links.instagram;
    default:
      return href;
  }
}

export function isExternal(href) {
  return /^https?:\/\//.test(resolveHref(href));
}

// Props for an <a>: external links open in a new tab.
export function linkProps(href) {
  const url = resolveHref(href);
  return isExternal(href) ? { href: url, target: "_blank", rel: "noopener" } : { href: url };
}
