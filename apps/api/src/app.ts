import express from "express";
import { randomUUID } from "node:crypto";
import { requireAuth, signIn, signOut, type AuthedRequest } from "./auth/session.js";
import { config } from "./config.js";
import type { Order } from "./db/schema.js";
import type { Store } from "./db/store.js";
import { refuse, type RequestedLine } from "./orders/validate.js";
import { computeTotals } from "./pricing/total.js";

export function createApp(store: Store, clock: () => Date = () => new Date()) {
  const app = express();
  app.use(express.json());

  app.get("/api/health", (_req, res) => {
    res.json({ ok: true });
  });

  app.post("/api/auth/sign-in", (req, res) => {
    const { email, pin } = req.body ?? {};
    const token = typeof email === "string" && typeof pin === "string" ? signIn(store, email, pin) : null;
    if (!token) {
      res.status(401).json({ error: "wrong_credentials" });
      return;
    }
    const employee = store.read().employees.find((e) => e.email === email.trim().toLowerCase())!;
    res.json({ token, name: employee.name });
  });

  app.post("/api/auth/sign-out", requireAuth, (req, res) => {
    signOut(req.header("authorization")!.slice(7));
    res.status(204).end();
  });

  app.get("/api/menu", (_req, res) => {
    res.json({ items: store.read().menu, maxItemsPerOrder: config.maxItemsPerOrder, orderCutoffHour: config.orderCutoffHour });
  });

  app.post("/api/orders", requireAuth, (req: AuthedRequest, res) => {
    const lines: RequestedLine[] = Array.isArray(req.body?.lines) ? req.body.lines : [];
    const db = store.read();
    const refusal = refuse(lines, db.menu, clock());
    if (refusal) {
      res.status(422).json(refusal);
      return;
    }
    const priced = lines.map((l) => ({
      itemId: l.itemId,
      quantity: l.quantity,
      unitPriceCents: db.menu.find((m) => m.id === l.itemId)!.priceCents,
    }));
    const order: Order = {
      id: randomUUID(),
      employeeId: req.employeeId!,
      lines: priced,
      ...computeTotals(priced, db.menu),
      status: "received",
      createdAt: clock().toISOString(),
    };
    db.orders.push(order);
    store.write(db);
    res.status(201).json(order);
  });

  app.get("/api/orders/mine", requireAuth, (req: AuthedRequest, res) => {
    const mine = store
      .read()
      .orders.filter((o) => o.employeeId === req.employeeId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    res.json({ orders: mine });
  });

  return app;
}
