import { useState } from "react";
import { ApiError, placeOrder, type Menu } from "../api";
import { formatPrice, refusalMessage } from "../format";

export type CartLines = Record<string, number>;

interface Props {
  menu: Menu;
  lines: CartLines;
  onAdd: (itemId: string) => void;
  onRemove: (itemId: string) => void;
  onPlaced: () => void;
}

export function Cart({ menu, lines, onAdd, onRemove, onPlaced }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const entries = Object.entries(lines);
  const count = entries.reduce((sum, [, q]) => sum + q, 0);
  const subtotal = entries.reduce((sum, [id, q]) => sum + (menu.items.find((i) => i.id === id)?.priceCents ?? 0) * q, 0);

  async function confirm() {
    setSending(true);
    setError(null);
    try {
      await placeOrder(entries.map(([itemId, quantity]) => ({ itemId, quantity })));
      onPlaced();
    } catch (e) {
      setError(e instanceof ApiError ? refusalMessage(e.code, e.body) : refusalMessage("unknown", {}));
    } finally {
      setSending(false);
    }
  }

  return (
    <aside className="cart">
      <h2>Tu pedido</h2>
      {entries.length === 0 ? (
        <p className="empty">Tu pedido está vacío.</p>
      ) : (
        <>
          <ul className="cart-lines">
            {entries.map(([id, quantity]) => {
              const item = menu.items.find((i) => i.id === id)!;
              return (
                <li key={id}>
                  <span>{item.name}</span>
                  <span className="qty">
                    <button className="btn-qty" aria-label={`Quitar ${item.name}`} onClick={() => onRemove(id)}>
                      −
                    </button>
                    {quantity}
                    <button className="btn-qty" aria-label={`Agregar ${item.name}`} onClick={() => onAdd(id)}>
                      +
                    </button>
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="subtotal">
            Subtotal <strong>{formatPrice(subtotal)}</strong>
          </p>
          <p className="note">El descuento por combo se aplica al confirmar.</p>
        </>
      )}
      <p className="limit">
        {count} de {menu.maxItemsPerOrder} ítems · pedidos hasta las {menu.orderCutoffHour}:00
      </p>
      {error && <p className="error">{error}</p>}
      <button className="btn-confirm" disabled={entries.length === 0 || sending} onClick={confirm}>
        {sending ? "Enviando…" : "Confirmar pedido"}
      </button>
    </aside>
  );
}
