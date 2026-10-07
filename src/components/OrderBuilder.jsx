import { useMemo, useRef, useState } from "react";
import business from "../config/business.js";
import { resolveHref } from "../lib/links.js";
import SectionHeading from "./ui/SectionHeading.jsx";
import Button from "./ui/Button.jsx";

const asOption = (d) => (typeof d === "string" ? { label: d, value: d } : d);

export default function OrderBuilder() {
  const { order, phone } = business;
  const drinks = order.drinks.map(asOption);
  const [drink, setDrink] = useState(drinks[0].value);
  const [qty, setQty] = useState(1);
  const [name, setName] = useState("");
  const [extras, setExtras] = useState("");
  const [when, setWhen] = useState(order.pickup[0].value);
  const [status, setStatus] = useState("");
  const bubble = useRef(null);

  const message = useMemo(() => {
    const m = order.message;
    const item = drink.charAt(0).toLowerCase() + drink.slice(1);
    const line = `${qty} ${item}${qty > 1 ? "s" : ""}`;
    const extra = extras.trim() ? ` (${extras.trim()})` : "";
    return `${m.greeting} ${line}${extra} ${m.please} ${m.name} ${name.trim() || m.noName}. ${m.pickup} ${when}. ${m.thanks}`;
  }, [order.message, drink, qty, extras, name, when]);

  const smsHref = `${resolveHref("sms")}?&body=${encodeURIComponent(message)}`;

  const onSend = () => setStatus(name.trim() ? "" : order.needName);

  const onCopy = () => {
    const selectFallback = () => {
      const range = document.createRange();
      range.selectNodeContents(bubble.current);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      setStatus(order.selected);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(message).then(() => setStatus(order.copied), selectFallback);
    } else {
      selectFallback();
    }
  };

  const touch = (fn) => (e) => {
    fn(e.target.value);
    setStatus("");
  };

  return (
    <section className="order" id="text" aria-labelledby="order-title">
      <div className="order-in wrap">
        <div className="order-copy">
          <SectionHeading id="order-title">{order.title}</SectionHeading>
          <p>{order.intro}</p>
          {phone.display ? (
            <p className="number">
              {order.numberLabel} <output htmlFor="sms-link">{phone.display}</output>
            </p>
          ) : null}
        </div>

        <form className="builder" noValidate onSubmit={(e) => e.preventDefault()}>
          <fieldset>
            <legend>{order.drinksLegend}</legend>
            <div className="chips">
              {drinks.map((d, i) => (
                <label className="chip" key={d.value}>
                  <input
                    type="radio"
                    name="drink"
                    id={`drink-${i}`}
                    value={d.value}
                    checked={drink === d.value}
                    onChange={touch(setDrink)}
                  />
                  <span>{d.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="row2">
            <div className="field">
              <label className="lbl" htmlFor="qty">
                {order.qtyLabel}
              </label>
              <select id="qty" name="qty" value={qty} onChange={(e) => setQty(parseInt(e.target.value, 10) || 1)}>
                {Array.from({ length: order.maxQty }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label className="lbl" htmlFor="order-name">
                {order.nameLabel}
              </label>
              <input
                id="order-name"
                name="name"
                type="text"
                autoComplete="given-name"
                spellCheck={false}
                placeholder={order.namePlaceholder}
                value={name}
                onChange={touch(setName)}
              />
            </div>
          </div>

          <div className="field">
            <label className="lbl" htmlFor="extras">
              {order.extrasLabel}
            </label>
            <input
              id="extras"
              name="extras"
              type="text"
              autoComplete="off"
              placeholder={order.extrasPlaceholder}
              value={extras}
              onChange={touch(setExtras)}
            />
            <p className="help">{order.extrasHelp}</p>
          </div>

          <fieldset>
            <legend>{order.pickupLegend}</legend>
            <div className="chips">
              {order.pickup.map((p, i) => (
                <label className="chip" key={p.value}>
                  <input
                    type="radio"
                    name="when"
                    id={`when-${i}`}
                    value={p.value}
                    checked={when === p.value}
                    onChange={touch(setWhen)}
                  />
                  <span>{p.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="preview">
            <span className="preview-label">{order.previewLabel}</span>
            <p className="bubble" ref={bubble}>
              {message}
            </p>
          </div>

          <div className="actions">
            <Button href={smsHref} id="sms-link" hand onClick={onSend}>
              {order.sendLabel}
            </Button>
            <Button variant="ghost" onClick={onCopy}>
              {order.copyLabel}
            </Button>
          </div>
          <p className="status" role="status">
            {status}
          </p>
        </form>
      </div>
    </section>
  );
}
