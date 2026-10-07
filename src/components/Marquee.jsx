import { Fragment, useState } from "react";
import business from "../config/business.js";
import Hand from "./ui/Hand.jsx";

function Row() {
  return (
    <div className="marquee-row display">
      {business.marquee.map((item) => (
        <Fragment key={item}>
          <span>{item}</span>
          <Hand />
        </Fragment>
      ))}
    </div>
  );
}

export default function Marquee() {
  const [paused, setPaused] = useState(false);
  if (!business.marquee.length) return null;
  return (
    <div className={`marquee${paused ? " paused" : ""}`}>
      <button className="marquee-toggle" type="button" aria-pressed={paused} onClick={() => setPaused((p) => !p)}>
        {paused ? business.marqueePlay : business.marqueePause}
      </button>
      <div className="marquee-track" aria-hidden="true">
        <Row />
        <Row />
      </div>
    </div>
  );
}
