/** Céntimos as soles: 1850 → "S/ 18.50". */
export function formatPrice(cents: number): string {
  return `S/ ${(cents / 100).toFixed(2)}`;
}

const STATUS_LABELS: Record<string, string> = {
  received: "Recibido",
  ready: "Listo para recoger",
  delivered: "Entregado",
  cancelled: "Cancelado",
};

export function statusLabel(status: string): string {
  return STATUS_LABELS[status] ?? status;
}

/** What the employee is told when the API refuses an order. */
export function refusalMessage(code: string, body: Record<string, unknown>): string {
  switch (code) {
    case "too_many_items":
      return `Un pedido puede tener como máximo ${body.max} ítems.`;
    case "past_cutoff":
      return `Los pedidos del día se reciben hasta las ${body.cutoffHour}:00.`;
    case "item_unavailable":
      return "Uno de los platos ya no está disponible hoy.";
    case "empty_order":
      return "Agrega al menos un ítem.";
    case "not_signed_in":
      return "Tu sesión expiró. Vuelve a ingresar.";
    default:
      return "No pudimos registrar tu pedido. Inténtalo de nuevo.";
  }
}
