// The shape of everything the cafeteria stores. Money is always in céntimos (integer).

export type Category = "main" | "drink" | "dessert" | "snack";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: Category;
  priceCents: number;
  available: boolean;
}

export interface Employee {
  id: string;
  email: string;
  name: string;
  /** Four digits. Kept in plain text: this is an internal demo, not a production system. */
  pin: string;
}

export interface OrderLine {
  itemId: string;
  quantity: number;
  unitPriceCents: number;
}

export type OrderStatus = "received" | "ready" | "delivered" | "cancelled";

export interface Order {
  id: string;
  employeeId: string;
  lines: OrderLine[];
  subtotalCents: number;
  discountCents: number;
  totalCents: number;
  status: OrderStatus;
  createdAt: string;
}

export interface Database {
  menu: MenuItem[];
  employees: Employee[];
  orders: Order[];
}
