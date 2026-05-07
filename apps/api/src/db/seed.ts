import type { Database } from "./schema.js";

export function seed(): Database {
  return {
    menu: [
      { id: "lomo", name: "Lomo saltado", description: "Con arroz y papas fritas", category: "main", priceCents: 1800, available: true },
      { id: "aji", name: "Ají de gallina", description: "Con arroz, huevo y aceituna", category: "main", priceCents: 1500, available: true },
      { id: "causa", name: "Causa limeña", description: "Rellena de pollo", category: "main", priceCents: 1200, available: true },
      { id: "ensalada", name: "Ensalada de quinua", description: "Vegetariana", category: "main", priceCents: 1300, available: true },
      { id: "chicha", name: "Chicha morada", description: "Vaso de 400 ml", category: "drink", priceCents: 500, available: true },
      { id: "limonada", name: "Limonada frozen", description: "Vaso de 400 ml", category: "drink", priceCents: 600, available: true },
      { id: "cafe", name: "Café americano", description: "Taza de 250 ml", category: "drink", priceCents: 450, available: true },
      { id: "mazamorra", name: "Mazamorra morada", description: "Porción individual", category: "dessert", priceCents: 400, available: true },
      { id: "alfajor", name: "Alfajor", description: "De manjar blanco", category: "dessert", priceCents: 350, available: false },
      { id: "chifles", name: "Chifles", description: "Bolsa de 80 g", category: "snack", priceCents: 300, available: true },
    ],
    employees: [
      { id: "e1", email: "ana.torres@cafeteria.test", name: "Ana Torres", pin: "1234" },
      { id: "e2", email: "luis.ramos@cafeteria.test", name: "Luis Ramos", pin: "5678" },
    ],
    orders: [],
  };
}
