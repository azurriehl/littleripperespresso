// Small Phosphor icons from the sprite: "caret", "out", "list", "close".
export default function Icon({ name, className = "chev" }) {
  return (
    <svg className={className} viewBox="0 0 256 256" aria-hidden="true" focusable="false">
      <use href={`#${name}`} />
    </svg>
  );
}
