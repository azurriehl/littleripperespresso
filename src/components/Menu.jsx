import business from "../config/business.js";
import SectionHeading from "./ui/SectionHeading.jsx";
import Hand from "./ui/Hand.jsx";

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
  const { feature, hotDrinks, matcha, smoothies, food } = menu;
  return (
    <section className="menu" id="menu" aria-labelledby="menu-title">
      <div className="wrap">
        <SectionHeading id="menu-title">{menu.title}</SectionHeading>
        <div className="bento">
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
            {food.image?.src ? (
              <div className="photo">
                <img
                  src={food.image.src}
                  alt={food.image.alt}
                  width={food.image.width}
                  height={food.image.height}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ) : null}
            <div>
              <h3 className="display">{food.title}</h3>
              <p>{food.text}</p>
            </div>
          </article>
        </div>
        {menu.priceNote ? <p className="price-note">{menu.priceNote}</p> : null}
      </div>
    </section>
  );
}
