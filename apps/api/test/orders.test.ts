import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { memoryStore } from "../src/db/store.js";

const morning = () => new Date(2026, 4, 12, 11, 0);
const evening = () => new Date(2026, 4, 12, 16, 0);

async function signedIn(clock = morning) {
  const app = createApp(memoryStore(), clock);
  const res = await request(app).post("/api/auth/sign-in").send({ email: "ana.torres@cafeteria.test", pin: "1234" });
  return { app, auth: `Bearer ${res.body.token}` };
}

describe("orders", () => {
  it("refuses an order from someone not signed in", async () => {
    const app = createApp(memoryStore(), morning);
    const res = await request(app).post("/api/orders").send({ lines: [{ itemId: "lomo", quantity: 1 }] });
    expect(res.status).toBe(401);
  });

  it("places an order with its totals", async () => {
    const { app, auth } = await signedIn();
    const res = await request(app).post("/api/orders").set("authorization", auth).send({ lines: [{ itemId: "lomo", quantity: 1 }, { itemId: "chicha", quantity: 1 }] });
    expect(res.status).toBe(201);
    expect(res.body.totalCents).toBe(2070);
    expect(res.body.status).toBe("received");
  });

  it("refuses more items than an order may hold", async () => {
    const { app, auth } = await signedIn();
    const res = await request(app).post("/api/orders").set("authorization", auth).send({ lines: [{ itemId: "chifles", quantity: 11 }] });
    expect(res.status).toBe(422);
    expect(res.body.error).toBe("too_many_items");
  });

  it("refuses an item that is not available today", async () => {
    const { app, auth } = await signedIn();
    const res = await request(app).post("/api/orders").set("authorization", auth).send({ lines: [{ itemId: "alfajor", quantity: 1 }] });
    expect(res.body.error).toBe("item_unavailable");
  });

  it("refuses orders after the cutoff hour", async () => {
    const { app, auth } = await signedIn(evening);
    const res = await request(app).post("/api/orders").set("authorization", auth).send({ lines: [{ itemId: "lomo", quantity: 1 }] });
    expect(res.body.error).toBe("past_cutoff");
  });

  it("lists only the signed-in employee's orders", async () => {
    const { app, auth } = await signedIn();
    await request(app).post("/api/orders").set("authorization", auth).send({ lines: [{ itemId: "cafe", quantity: 2 }] });
    const res = await request(app).get("/api/orders/mine").set("authorization", auth);
    expect(res.body.orders).toHaveLength(1);
  });
});
