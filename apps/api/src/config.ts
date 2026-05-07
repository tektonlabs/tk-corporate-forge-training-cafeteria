// Operational settings for the cafeteria. Prices and discounts live in pricing/.

export const config = {
  port: Number(process.env.PORT ?? 3001),

  /** Where the JSON database is kept. Created from the seed on first start. */
  dataFile: process.env.DATA_FILE ?? new URL("../data/db.json", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"),

  /** The most items one order may hold, counting quantities. */
  maxItemsPerOrder: 10,

  /** Orders for today are accepted until this hour (24h, local time). */
  orderCutoffHour: 15,

  /** How long a sign-in lasts, in hours. */
  sessionHours: 8,
} as const;
