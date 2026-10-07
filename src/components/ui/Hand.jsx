// The café's shaka hand mark. Colour comes from CSS (fill: currentColor).
export default function Hand({ className = "hand", title }) {
  return (
    <svg className={className} viewBox="0 0 264.11 391.73" aria-hidden={title ? undefined : "true"} role={title ? "img" : undefined}>
      {title ? <title>{title}</title> : null}
      <use href="#hand" />
    </svg>
  );
}
