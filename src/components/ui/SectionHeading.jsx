// Big uppercase section title in the display face.
export default function SectionHeading({ id, children, as: Tag = "h2" }) {
  return (
    <Tag id={id} className="display">
      {children}
    </Tag>
  );
}
