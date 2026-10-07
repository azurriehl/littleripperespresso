import { useRef, useState } from "react";
import business from "../config/business.js";
import { linkProps, resolveHref } from "../lib/links.js";
import SectionHeading from "./ui/SectionHeading.jsx";
import Button from "./ui/Button.jsx";
import Hand from "./ui/Hand.jsx";

function ContactForm() {
  const { email, contact } = business;
  const f = contact.form;
  const [values, setValues] = useState({ name: "", reply: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const refs = { name: useRef(null), reply: useRef(null), message: useRef(null) };

  const set = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
    setStatus("");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const next = {};
    for (const key of ["name", "reply", "message"]) {
      if (!values[key].trim()) next[key] = f.errors[key];
    }
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      refs[first].current?.focus();
      return;
    }
    const subject = `${f.subject}: ${values.name.trim()}`;
    const body = `${values.message.trim()}\n\n${values.name.trim()}\n${values.reply.trim()}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus(f.sent);
  };

  const field = (key, label, input, help) => (
    <div className="field">
      <label className="lbl" htmlFor={`contact-${key}`}>
        {label}
      </label>
      {input}
      {help ? (
        <p className="help" id={`contact-${key}-help`}>
          {help}
        </p>
      ) : null}
      {errors[key] ? (
        <p className="error" id={`contact-${key}-error`}>
          {errors[key]}
        </p>
      ) : null}
    </div>
  );

  const aria = (key, hasHelp) => ({
    "aria-invalid": errors[key] ? "true" : undefined,
    "aria-describedby":
      [hasHelp ? `contact-${key}-help` : null, errors[key] ? `contact-${key}-error` : null].filter(Boolean).join(" ") ||
      undefined,
  });

  return (
    <form className="contact-form builder" noValidate onSubmit={onSubmit}>
      <h3 className="display">{f.title}</h3>
      <div className="row2">
        {field(
          "name",
          f.nameLabel,
          <input
            ref={refs.name}
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={set("name")}
            {...aria("name")}
          />
        )}
        {field(
          "reply",
          f.replyLabel,
          <input
            ref={refs.reply}
            id="contact-reply"
            name="reply"
            type="text"
            autoComplete="email"
            spellCheck={false}
            value={values.reply}
            onChange={set("reply")}
            {...aria("reply", true)}
          />,
          f.replyHelp
        )}
      </div>
      {field(
        "message",
        f.messageLabel,
        <textarea
          ref={refs.message}
          id="contact-message"
          name="message"
          rows={5}
          placeholder={f.messagePlaceholder}
          value={values.message}
          onChange={set("message")}
          {...aria("message")}
        />
      )}
      <div className="actions">
        <button className="btn btn-solid" type="submit">
          {f.submit}
        </button>
      </div>
      <p className="status" role="status">
        {status}
      </p>
    </form>
  );
}

export default function Contact() {
  const { contact, address, phone, email, hours, hoursFallback, links, whatsapp } = business;
  const L = contact.labels;
  return (
    <section className="find" id="find" aria-labelledby="find-title">
      <div className="find-in wrap">
        <div className="find-copy">
          <SectionHeading id="find-title">{contact.title}</SectionHeading>
          <dl className="facts">
            <div>
              <dt>{L.address}</dt>
              <dd>
                {address.line1}
                <br />
                {address.line2}
              </dd>
            </div>
            <div>
              <dt>{L.hours}</dt>
              <dd>
                {hours.length ? (
                  hours.map((h) => (
                    <span key={h.days} style={{ display: "block" }}>
                      {h.days}: {h.time}
                    </span>
                  ))
                ) : (
                  <a {...linkProps("directions")}>{hoursFallback}</a>
                )}
              </dd>
            </div>
            {phone.display ? (
              <>
                <div>
                  <dt>{L.call}</dt>
                  <dd>
                    <a href={resolveHref("call")}>{phone.display}</a>
                  </dd>
                </div>
                <div>
                  <dt>{L.text}</dt>
                  <dd>
                    <a href={resolveHref("sms")}>{phone.display}</a>
                  </dd>
                </div>
              </>
            ) : null}
            {email ? (
              <div>
                <dt>{L.email}</dt>
                <dd>
                  <a href={resolveHref("email")}>{email}</a>
                </dd>
              </div>
            ) : null}
            <div>
              <dt>{L.how}</dt>
              <dd>
                {contact.how} <a {...linkProps("uberEats")}>{contact.howLink}</a>
              </dd>
            </div>
            {links.instagram ? (
              <div>
                <dt>{L.instagram}</dt>
                <dd>
                  <a {...linkProps("instagram")}>{links.instagramHandle}</a>
                </dd>
              </div>
            ) : null}
          </dl>
          <div className="contact-actions">
            {phone.display ? <Button href="call">{contact.actions.call}</Button> : null}
            {email ? (
              <Button href="email" variant="ghost">
                {contact.actions.email}
              </Button>
            ) : null}
            {whatsapp ? (
              <Button href={`https://wa.me/${whatsapp}`} variant="ghost" arrow>
                {contact.actions.whatsapp}
              </Button>
            ) : null}
            <Button href="directions" variant="ghost" arrow>
              {contact.actions.directions}
            </Button>
          </div>
          {email ? <ContactForm /> : null}
        </div>
        <div className="find-block" aria-hidden="true">
          <Hand />
          <p className="display">
            {contact.blockText.map((line, i) => (
              <span key={line} style={{ display: "block" }}>
                {line}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
