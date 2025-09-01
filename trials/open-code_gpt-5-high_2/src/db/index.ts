import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { posts, comments } from './schema';
import path from 'path';
import fs from 'fs';

const dbPath = path.join(process.cwd(), 'blog.db');

if (!fs.existsSync(dbPath)) {
  // ensure file exists
  fs.writeFileSync(dbPath, '');
}

const sqlite = new Database(dbPath);
export const db = drizzle(sqlite);

// simple migration: create tables if not exist
sqlite.exec(`
CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER NOT NULL,
  author TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  FOREIGN KEY(post_id) REFERENCES posts(id) ON DELETE CASCADE
);
`);

export { posts, comments };
