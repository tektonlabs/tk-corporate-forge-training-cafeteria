import { randomUUID } from "node:crypto";
import type { NextFunction, Request, Response } from "express";
import { config } from "../config.js";
import type { Store } from "../db/store.js";

interface Session {
  employeeId: string;
  expiresAt: number;
}

const sessions = new Map<string, Session>();

/** Signs an employee in with their email and PIN. Returns a token, or null. */
export function signIn(store: Store, email: string, pin: string, now = Date.now()): string | null {
  const employee = store.read().employees.find((e) => e.email === email.trim().toLowerCase());
  if (!employee || employee.pin !== pin) return null;
  const token = randomUUID();
  sessions.set(token, { employeeId: employee.id, expiresAt: now + config.sessionHours * 3600_000 });
  return token;
}

export function signOut(token: string): void {
  sessions.delete(token);
}

export function employeeFor(token: string | undefined, now = Date.now()): string | null {
  if (!token) return null;
  const session = sessions.get(token);
  if (!session) return null;
  if (session.expiresAt <= now) {
    sessions.delete(token);
    return null;
  }
  return session.employeeId;
}

export interface AuthedRequest extends Request {
  employeeId?: string;
}

/** Every route that reads or writes an employee's data goes through this. */
export function requireAuth(req: AuthedRequest, res: Response, next: NextFunction): void {
  const header = req.header("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : undefined;
  const employeeId = employeeFor(token);
  if (!employeeId) {
    res.status(401).json({ error: "not_signed_in" });
    return;
  }
  req.employeeId = employeeId;
  next();
}
