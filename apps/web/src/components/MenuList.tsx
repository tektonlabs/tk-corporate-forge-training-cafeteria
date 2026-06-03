import type { Category, MenuItem } from "../api";
import { formatPrice } from "../format";

const SECTIONS: { category: Category; title: string }[] = [
  { category: "main", title: "Platos de fondo" },
  { category: "drink", title: "Bebidas" },
  { category: "dessert", title: "Postres" },
  { category: "snack", title: "Para picar" },
];

export function MenuList({ items, onAdd }: { items: MenuItem[]; onAdd: (itemId: string) => void }) {
  return (
    <section className="menu">
      <p className="hint">Un plato de fondo con una bebida es un combo: 10% de descuento en los dos.</p>
      {SECTIONS.map(({ category, title }) => (
        <div key={category}>
          <h2>{title}</h2>
          <ul className="cards">
            {items
              .filter((i) => i.category === category)
              .map((item) => (
                <li key={item.id} className={item.available ? "card" : "card unavailable"}>
                  <div>
                    <strong>{item.name}</strong>
                    <span className="description">{item.description}</span>
                  </div>
                  <div className="card-actions">
                    <span className="price">{formatPrice(item.priceCents)}</span>
                    {item.available ? (
                      <button className="btn-secondary" onClick={() => onAdd(item.id)}>
                        Agregar
                      </button>
                    ) : (
                      <span className="sold-out">Agotado</span>
                    )}
                  </div>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
