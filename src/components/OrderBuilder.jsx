import { useMemo, useRef, useState } from "react";
import business from "../config/business.js";
import { resolveHref } from "../lib/links.js";
import SectionHeading from "./ui/SectionHeading.jsx";
import Button from "./ui/Button.jsx";

const asOption = (d) => (typeof d === "string" ? { label: d, value: d } : d);

// "a", "a and b", "a, b and c"
function joinList(items, and) {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} ${and} ${items[items.length - 1]}`;
}

export default function OrderBuilder() {
  const { order, phone, hours } = business;
  const openHours = hours.filter((h) => !/closed/i.test(h.time));
  const drinks = order.drinks.map(asOption);
  // Selected drinks in the order they were picked: [{ value, qty }]. qty stays a string while typing.
  const [items, setItems] = useState([{ value: drinks[0].value, qty: "1" }]);
  const [name, setName] = useState("");
  const [extras, setExtras] = useState("");
  const [when, setWhen] = useState(order.pickup[0].value);
  const [status, setStatus] = useState("");
  const bubble = useRef(null);

  const message = useMemo(() => {
    const m = order.message;
    const lines = items.map(({ value, qty }) => {
      const n = Math.min(Math.max(parseInt(qty, 10) || 1, 1), order.maxQty);
      const item = value.charAt(0).toLowerCase() + value.slice(1);
      return `${n} ${item}${n > 1 ? "s" : ""}`;
    });
    const list = lines.length ? joinList(lines, m.and) : m.noItems;
    // "Anything else" becomes its own sentence after the order, as typed.
    let extra = extras.trim();
    if (extra) {
      extra = extra.charAt(0).toUpperCase() + extra.slice(1);
      if (!/[.!?]$/.test(extra)) extra += ".";
      extra = ` ${extra}`;
    }
    return `${m.greeting} ${list} ${m.please}${extra} ${m.name} ${name.trim() || m.noName}. ${m.pickup} ${when}. ${m.thanks}`;
  }, [order.message, order.maxQty, items, extras, name, when]);

  const toggleDrink = (value) => {
    setItems((list) =>
      list.some((i) => i.value === value) ? list.filter((i) => i.value !== value) : [...list, { value, qty: "1" }]
    );
    setStatus("");
  };

  const setQtyFor = (value, qty) => {
    const clean = qty.replace(/[^0-9]/g, "").slice(0, 2);
    setItems((list) => list.map((i) => (i.value === value ? { ...i, qty: clean } : i)));
  };

  const fixQty = (value) => {
    setItems((list) =>
      list.map((i) => {
        if (i.value !== value) return i;
        const n = Math.min(Math.max(parseInt(i.qty, 10) || 1, 1), order.maxQty);
        return { ...i, qty: String(n) };
      })
    );
  };

  const smsHref = `${resolveHref("sms")}?&body=${encodeURIComponent(message)}`;

  const onSend = (e) => {
    if (!items.length) {
      e.preventDefault();
      setStatus(order.needDrink);
      return;
    }
    setStatus(name.trim() ? "" : order.needName);
  };

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
          {openHours.length && order.hoursNote ? (
            <p className="order-hours">
              {order.hoursNote} {openHours.map((h) => `${h.days} ${h.time}`).join(", ")}.
            </p>
          ) : null}
        </div>

        <form className="builder" noValidate onSubmit={(e) => e.preventDefault()}>
          <fieldset>
            <legend>{order.drinksLegend}</legend>
            <p className="drinks-help">{order.drinksHelp}</p>
            <div className="chips">
              {drinks.map((d, i) => {
                const picked = items.find((it) => it.value === d.value);
                return (
                  <span className="chip-wrap" key={d.value}>
                    <label className="chip">
                      <input
                        type="checkbox"
                        name="drinks"
                        id={`drink-${i}`}
                        value={d.value}
                        checked={Boolean(picked)}
                        onChange={() => toggleDrink(d.value)}
                      />
                      <span>{d.label}</span>
                    </label>
                    {picked ? (
                      <input
                        className="chip-qty"
                        id={`drink-${i}-qty`}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        autoComplete="off"
                        aria-label={`${order.qtyAria}: ${d.label}`}
                        value={picked.qty}
                        onChange={(e) => setQtyFor(d.value, e.target.value)}
                        onBlur={() => fixQty(d.value)}
                        onFocus={(e) => e.target.select()}
                      />
                    ) : null}
                  </span>
                );
              })}
            </div>
          </fieldset>

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
