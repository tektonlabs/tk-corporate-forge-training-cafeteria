import { describe, expect, it } from "vitest";
import { seed } from "../src/db/seed.js";
import { computeTotals } from "../src/pricing/total.js";

const menu = seed().menu;
const line = (itemId: string, quantity = 1) => ({
  itemId,
  quantity,
  unitPriceCents: menu.find((m) => m.id === itemId)!.priceCents,
});

describe("computeTotals", () => {
  it("charges the subtotal when there is no combo", () => {
    expect(computeTotals([line("lomo"), line("mazamorra")], menu)).toEqual({ subtotalCents: 2200, discountCents: 0, totalCents: 2200 });
  });

  it("takes 10% off a main and a drink ordered together", () => {
    // 1800 + 500 = 2300 → 230 off
    expect(computeTotals([line("lomo"), line("chicha")], menu)).toEqual({ subtotalCents: 2300, discountCents: 230, totalCents: 2070 });
  });

  it("pairs as many combos as there are mains and drinks, and no more", () => {
    // combos: lomo+cafe (2250), aji+chicha (2000); the third main has no drink
    const totals = computeTotals([line("lomo"), line("aji"), line("causa"), line("cafe"), line("chicha")], menu);
    expect(totals.discountCents).toBe(425);
  });
});
