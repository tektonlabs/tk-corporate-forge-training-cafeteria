import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import type { Database } from "./schema.js";
import { seed } from "./seed.js";

export interface Store {
  read(): Database;
  write(db: Database): void;
}

/** A store backed by a JSON file, created from the seed the first time. */
export function fileStore(path: string): Store {
  if (!existsSync(path)) {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, JSON.stringify(seed(), null, 2));
  }
  return {
    read: () => JSON.parse(readFileSync(path, "utf8")) as Database,
    write: (db) => writeFileSync(path, JSON.stringify(db, null, 2)),
  };
}

/** A store kept in memory — for tests. */
export function memoryStore(initial: Database = seed()): Store {
  let db = structuredClone(initial);
  return {
    read: () => structuredClone(db),
    write: (next) => {
      db = structuredClone(next);
    },
  };
}
