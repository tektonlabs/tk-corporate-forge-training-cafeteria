import type { MenuItem, OrderLine } from "../db/schema.js";

/** A main and a drink in the same order make a combo: 10% off the combo's two items. */
export const COMBO_DISCOUNT_PERCENT = 10;

export interface Totals {
  subtotalCents: number;
  discountCents: number;
  totalCents: number;
}

/**
 * What the employee pays. Each main paired with a drink is one combo; the
 * discount applies to the cheapest drink paired with the most expensive main,
 * and so on, until either runs out.
 */
export function computeTotals(lines: OrderLine[], menu: MenuItem[]): Totals {
  const byId = new Map(menu.map((m) => [m.id, m]));
  const subtotalCents = lines.reduce((sum, l) => sum + l.unitPriceCents * l.quantity, 0);

  const unitsOf = (category: string) =>
    lines
      .filter((l) => byId.get(l.itemId)?.category === category)
      .flatMap((l) => Array.from({ length: l.quantity }, () => l.unitPriceCents));

  const mains = unitsOf("main").sort((a, b) => b - a);
  const drinks = unitsOf("drink").sort((a, b) => a - b);
  const combos = Math.min(mains.length, drinks.length);

  let comboValue = 0;
  for (let i = 0; i < combos; i++) comboValue += mains[i] + drinks[i];

  const discountCents = Math.round((comboValue * COMBO_DISCOUNT_PERCENT) / 100);
  return { subtotalCents, discountCents, totalCents: subtotalCents - discountCents };
}
