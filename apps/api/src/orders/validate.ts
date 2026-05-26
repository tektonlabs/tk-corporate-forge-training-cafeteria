import { config } from "../config.js";
import type { MenuItem } from "../db/schema.js";

export interface RequestedLine {
  itemId: string;
  quantity: number;
}

export type Refusal =
  | { error: "empty_order" }
  | { error: "too_many_items"; max: number }
  | { error: "invalid_quantity"; itemId: string }
  | { error: "unknown_item"; itemId: string }
  | { error: "item_unavailable"; itemId: string }
  | { error: "past_cutoff"; cutoffHour: number };

/** Why an order cannot be placed, or null when it can. */
export function refuse(lines: RequestedLine[], menu: MenuItem[], now = new Date()): Refusal | null {
  if (now.getHours() >= config.orderCutoffHour) return { error: "past_cutoff", cutoffHour: config.orderCutoffHour };
  if (lines.length === 0) return { error: "empty_order" };

  for (const line of lines) {
    if (!Number.isInteger(line.quantity) || line.quantity < 1) return { error: "invalid_quantity", itemId: line.itemId };
    const item = menu.find((m) => m.id === line.itemId);
    if (!item) return { error: "unknown_item", itemId: line.itemId };
    if (!item.available) return { error: "item_unavailable", itemId: line.itemId };
  }

  const count = lines.reduce((sum, l) => sum + l.quantity, 0);
  if (count > config.maxItemsPerOrder) return { error: "too_many_items", max: config.maxItemsPerOrder };
  return null;
}
