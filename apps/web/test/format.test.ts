import { describe, expect, it } from "vitest";
import { formatPrice, refusalMessage, statusLabel } from "../src/format";

describe("formatPrice", () => {
  it("shows céntimos as soles with two decimals", () => {
    expect(formatPrice(1850)).toBe("S/ 18.50");
    expect(formatPrice(300)).toBe("S/ 3.00");
  });
});

describe("statusLabel", () => {
  it("translates the order status", () => {
    expect(statusLabel("ready")).toBe("Listo para recoger");
  });
});

describe("refusalMessage", () => {
  it("names the limit the API sent", () => {
    expect(refusalMessage("too_many_items", { max: 10 })).toBe("Un pedido puede tener como máximo 10 ítems.");
  });
});
