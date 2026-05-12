import { describe, expect, it } from "vitest";
import { employeeFor, signIn } from "../src/auth/session.js";
import { memoryStore } from "../src/db/store.js";

describe("sign-in", () => {
  it("signs in with the right PIN, case-insensitive on the email", () => {
    const token = signIn(memoryStore(), "Ana.Torres@cafeteria.test", "1234");
    expect(token).not.toBeNull();
    expect(employeeFor(token!)).toBe("e1");
  });

  it("refuses a wrong PIN", () => {
    expect(signIn(memoryStore(), "ana.torres@cafeteria.test", "0000")).toBeNull();
  });

  it("forgets a session once it expires", () => {
    const start = Date.now();
    const token = signIn(memoryStore(), "luis.ramos@cafeteria.test", "5678", start)!;
    expect(employeeFor(token, start + 9 * 3600_000)).toBeNull();
  });
});
