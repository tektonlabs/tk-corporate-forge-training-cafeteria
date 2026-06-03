import { useEffect, useState } from "react";
import { fetchMyOrders, type Menu, type Order } from "../api";
import { formatPrice, statusLabel } from "../format";

export function MyOrders({ menu }: { menu: Menu }) {
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    fetchMyOrders().then((r) => setOrders(r.orders));
  }, []);

  if (!orders) return <p className="loading">Cargando…</p>;
  if (orders.length === 0) return <p className="empty">Todavía no hiciste ningún pedido.</p>;

  return (
    <section className="orders">
      <h2>Mis pedidos</h2>
      <ul>
        {orders.map((o) => (
          <li key={o.id} className="order">
            <div className="order-head">
              <span>{new Date(o.createdAt).toLocaleString("es-PE", { dateStyle: "medium", timeStyle: "short" })}</span>
              <span className={`status status-${o.status}`}>{statusLabel(o.status)}</span>
            </div>
            <ul className="order-lines">
              {o.lines.map((l) => (
                <li key={l.itemId}>
                  {l.quantity} × {menu.items.find((i) => i.id === l.itemId)?.name ?? l.itemId}
                </li>
              ))}
            </ul>
            <div className="order-total">
              {o.discountCents > 0 && <span className="discount">Combo −{formatPrice(o.discountCents)}</span>}
              <strong>{formatPrice(o.totalCents)}</strong>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
