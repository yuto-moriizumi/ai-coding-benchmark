import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import path from "node:path";
import fs from "node:fs";

// Singleton DB connection within process
let sqlite: Database.Database | null = null;

function ensureDir(filePath: string) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

export function getSqlite() {
  if (!sqlite) {
    const dbPath = path.join(process.cwd(), "data", "blog.sqlite");
    ensureDir(dbPath);
    sqlite = new Database(dbPath);
    // Ensure schema exists (id resets handled by DROP in reset action)
    sqlite.exec(`
      PRAGMA foreign_keys = ON;
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at INTEGER
      );
      CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY,
        post_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at INTEGER,
        FOREIGN KEY(post_id) REFERENCES posts(id) ON DELETE CASCADE
      );
    `);
  }
  return sqlite!;
}

export const db = drizzle(getSqlite());

export function resetDatabase() {
  const sql = getSqlite();
  sql.exec(`
    PRAGMA foreign_keys = OFF;
    DROP TABLE IF EXISTS comments;
    DROP TABLE IF EXISTS posts;
    PRAGMA foreign_keys = ON;
    CREATE TABLE posts (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at INTEGER
    );
    CREATE TABLE comments (
      id INTEGER PRIMARY KEY,
      post_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at INTEGER,
      FOREIGN KEY(post_id) REFERENCES posts(id) ON DELETE CASCADE
    );
  `);
}

