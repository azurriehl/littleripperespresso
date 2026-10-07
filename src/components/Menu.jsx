import business from "../config/business.js";
import SectionHeading from "./ui/SectionHeading.jsx";
import Hand from "./ui/Hand.jsx";

function Photo({ image, className = "photo" }) {
  if (!image?.src) return null;
  return (
    <div className={className} style={image.aspect ? { aspectRatio: image.aspect } : undefined}>
      <img
        style={image.focus ? { objectPosition: image.focus } : undefined}
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

function PriceList({ items, plain = false }) {
  return (
    <ul className={`prices${plain ? " plain" : ""}`}>
      {items.map((it) => (
        <li key={it.name}>
          <span>
            {it.name}
            {it.tag ? <em>{it.tag}</em> : null}
          </span>
          {it.price ? <span>{it.price}</span> : null}
        </li>
      ))}
    </ul>
  );
}

export default function Menu() {
  const { menu } = business;
  const { feature, hotDrinks, matcha, smoothies, food, newItem } = menu;
  return (
    <section className="menu" id="menu" aria-labelledby="menu-title">
      <div className="wrap">
        <SectionHeading id="menu-title">{menu.title}</SectionHeading>
        <div className={`bento${newItem ? " has-new" : ""}`}>
          <article className="cell c-mocha">
            <div>
              <h3 className="display">{feature.title}</h3>
              <p>{feature.text}</p>
            </div>
            <Hand />
          </article>
          <article className="cell c-hot">
            <h3 className="display">{hotDrinks.title}</h3>
            <PriceList items={hotDrinks.items} />
          </article>
          <article className="cell c-matcha">
            <div className="cell-top">
              <h3 className="display">{matcha.title}</h3>
              {matcha.price ? <span className="price">{matcha.price}</span> : null}
            </div>
            <p>{matcha.text}</p>
          </article>
          <article className="cell c-smooth">
            <div className="cell-top">
              <h3 className="display">{smoothies.title}</h3>
              {smoothies.price ? <span className="price">{smoothies.price}</span> : null}
            </div>
            <PriceList items={smoothies.items} plain />
            <p>{smoothies.text}</p>
          </article>
          <article className="cell c-food">
            <Photo image={food.image} />
            <div>
              <h3 className="display">{food.title}</h3>
              <p>{food.text}</p>
            </div>
            {food.lists?.map((list) =>
              list.items?.length ? (
                <div className="sublist" key={list.title}>
                  <h4>{list.title}</h4>
                  <PriceList items={list.items} plain={!list.items.some((i) => i.price)} />
                </div>
              ) : null
            )}
          </article>
          {newItem ? (
            <article className="cell c-new">
              <Photo image={newItem.image} />
              <div className="new-copy">
                {newItem.tag ? <span className="tag">{newItem.tag}</span> : null}
                <div className="cell-top">
                  <h3 className="display">{newItem.title}</h3>
                  {newItem.price ? <span className="price">{newItem.price}</span> : null}
                </div>
                <p>{newItem.text}</p>
              </div>
            </article>
          ) : null}
        </div>
        {menu.priceNote ? <p className="price-note">{menu.priceNote}</p> : null}
      </div>
    </section>
  );
}
