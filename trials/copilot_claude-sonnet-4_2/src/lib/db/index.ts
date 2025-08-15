import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import * as schema from "./schema";
import path from "path";

const sqlite = new Database(path.join(process.cwd(), "blog.db"));
export const db = drizzle(sqlite, { schema });

// Run migrations
try {
  migrate(db, { migrationsFolder: "./drizzle" });
} catch {
  // Migration may fail if tables already exist, which is fine
}
