import path from "node:path";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

// DB ファイルはアプリ配下に作成（UAT が読みやすいようプロジェクト直下）
export const DB_FILE = path.join(process.cwd(), "sqlite.db");

export const posts = sqliteTable("posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .default(new Date()),
});

export const comments = sqliteTable("comments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  postId: integer("post_id")
    .notNull()
    .references(() => posts.id, {
      onDelete: "cascade",
    }),
  author: text("author").notNull(),
  body: text("body").notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .default(new Date()),
});

let _db: ReturnType<typeof drizzle> | null = null;
let _sqlite: Database.Database | null = null;

export function getDb() {
  if (_db) return _db;
  const sqlite = new Database(DB_FILE);
  _sqlite = sqlite;
  const db = drizzle(sqlite);

  // Migrate (very light-weight create if not exists)
  sqlite
    .prepare(
      `CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at INTEGER NOT NULL
      )`
    )
    .run();

  sqlite
    .prepare(
      `CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        post_id INTEGER NOT NULL,
        author TEXT NOT NULL,
        body TEXT NOT NULL,
        created_at INTEGER NOT NULL,
        FOREIGN KEY(post_id) REFERENCES posts(id) ON DELETE CASCADE
      )`
    )
    .run();

  _db = db;
  return db;
}

export function getSqlite() {
  if (_sqlite) return _sqlite;
  // ensure schema
  getDb();
  return _sqlite!;
}

export type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
};

export type Comment = {
  id: number;
  postId: number;
  author: string;
  body: string;
  createdAt: Date;
};

export function resetAll() {
  const sqlite = getSqlite();
  sqlite.prepare("DELETE FROM comments").run();
  sqlite.prepare("DELETE FROM posts").run();
  // reset AUTOINCREMENT so next post ID becomes 1
  try {
    sqlite
      .prepare("DELETE FROM sqlite_sequence WHERE name IN ('posts','comments')")
      .run();
  } catch {}
}

export function listPosts(): Post[] {
  const sqlite = getSqlite();
  const rows = sqlite
    .prepare(
      `SELECT id, title, content, created_at as createdAt
       FROM posts
       ORDER BY id DESC`
    )
    .all() as {
    id: number;
    title: string;
    content: string;
    createdAt: number;
  }[];
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    content: r.content,
    createdAt: new Date(r.createdAt),
  }));
}

export function createPost(title: string, content: string): number {
  const sqlite = getSqlite();
  const res = sqlite
    .prepare(
      `INSERT INTO posts (title, content, created_at) VALUES (@title, @content, @createdAt)`
    )
    .run({ title, content, createdAt: Date.now() });
  return Number(res.lastInsertRowid);
}

export function getPost(id: number): Post | null {
  const sqlite = getSqlite();
  const row = sqlite
    .prepare(
      `SELECT id, title, content, created_at as createdAt FROM posts WHERE id = @id`
    )
    .get({ id }) as
    | { id: number; title: string; content: string; createdAt: number }
    | undefined;
  if (!row) return null;
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    createdAt: new Date(row.createdAt),
  };
}

export function listComments(postId: number): Comment[] {
  const sqlite = getSqlite();
  const rows = sqlite
    .prepare(
      `SELECT id, post_id as postId, author, body, created_at as createdAt
       FROM comments WHERE post_id = @postId ORDER BY id ASC`
    )
    .all({ postId }) as {
    id: number;
    postId: number;
    author: string;
    body: string;
    createdAt: number;
  }[];
  return rows.map((r) => ({
    id: r.id,
    postId: r.postId,
    author: r.author,
    body: r.body,
    createdAt: new Date(r.createdAt),
  }));
}

export function addComment(
  postId: number,
  author: string,
  body: string
): number {
  const sqlite = getSqlite();
  const res = sqlite
    .prepare(
      `INSERT INTO comments (post_id, author, body, created_at) VALUES (@postId, @author, @body, @createdAt)`
    )
    .run({ postId, author, body, createdAt: Date.now() });
  return Number(res.lastInsertRowid);
}
