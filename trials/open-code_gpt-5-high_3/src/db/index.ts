import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";
import fs from "node:fs";
import path from "node:path";

const dbFile = path.resolve(process.cwd(), "./blog.db");
const migrationsDir = path.resolve(process.cwd(), "./drizzle");

const sqlite = new Database(dbFile);

// simple migrations runner: run all .sql files in drizzle dir
if (fs.existsSync(migrationsDir)) {
  const files = fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith(".sql"))
    .sort();
  sqlite.exec("PRAGMA foreign_keys = ON;");
  for (const f of files) {
    const sql = fs.readFileSync(path.join(migrationsDir, f), "utf8");
    sqlite.exec(sql);
  }
}

export const db = drizzle(sqlite, { schema });
export type Db = typeof db;
