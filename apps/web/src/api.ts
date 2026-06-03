export type Category = "main" | "drink" | "dessert" | "snack";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: Category;
  priceCents: number;
  available: boolean;
}

export interface Menu {
  items: MenuItem[];
  maxItemsPerOrder: number;
  orderCutoffHour: number;
}

export interface Order {
  id: string;
  lines: { itemId: string; quantity: number; unitPriceCents: number }[];
  subtotalCents: number;
  discountCents: number;
  totalCents: number;
  status: "received" | "ready" | "delivered" | "cancelled";
  createdAt: string;
}

export class ApiError extends Error {
  constructor(public readonly code: string, public readonly body: Record<string, unknown>) {
    super(code);
  }
}

let token: string | null = sessionStorage.getItem("token");

async function call<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(path, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
  });
  if (res.status === 204) return undefined as T;
  const body = await res.json();
  if (!res.ok) throw new ApiError(body.error ?? "unknown", body);
  return body as T;
}

export const isSignedIn = () => token !== null;

export async function signIn(email: string, pin: string): Promise<string> {
  const res = await call<{ token: string; name: string }>("/api/auth/sign-in", { method: "POST", body: JSON.stringify({ email, pin }) });
  token = res.token;
  sessionStorage.setItem("token", res.token);
  sessionStorage.setItem("name", res.name);
  return res.name;
}

export async function signOut(): Promise<void> {
  await call("/api/auth/sign-out", { method: "POST" }).catch(() => undefined);
  token = null;
  sessionStorage.clear();
}

export const fetchMenu = () => call<Menu>("/api/menu");
export const fetchMyOrders = () => call<{ orders: Order[] }>("/api/orders/mine");
export const placeOrder = (lines: { itemId: string; quantity: number }[]) =>
  call<Order>("/api/orders", { method: "POST", body: JSON.stringify({ lines }) });
