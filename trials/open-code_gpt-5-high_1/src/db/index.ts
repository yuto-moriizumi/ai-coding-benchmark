import { drizzle } from "drizzle-orm/sql-js";
import initSqlJs from "sql.js";
import fs from "fs";
import path from "path";
import { posts, comments } from "./schema";

const DB_FILE = path.join(process.cwd(), "sqlite.db");
const WASM_PATH = path.join(process.cwd(), "node_modules/sql.js/dist/sql-wasm.wasm");

let sqlite: any; // sql.js Database instance
let db: any; // drizzle instance
let initPromise: Promise<void> | null = null;

const CREATE_TABLES_SQL = `
CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
`;

async function init() {
  if (initPromise) return initPromise;
  initPromise = (async () => {
    const SQL = await initSqlJs({
      locateFile: () => WASM_PATH,
    });
    if (fs.existsSync(DB_FILE)) {
      const fileBuffer = fs.readFileSync(DB_FILE);
      sqlite = new SQL.Database(new Uint8Array(fileBuffer));
    } else {
      sqlite = new SQL.Database();
    }
    // Ensure tables exist
    sqlite.run(CREATE_TABLES_SQL);
    db = drizzle(sqlite);
  })();
  await initPromise;
}

export async function getDb() {
  await init();
  return db;
}

export async function persistDb() {
  await init();
  const data = sqlite.export();
  fs.writeFileSync(DB_FILE, Buffer.from(data));
}

export async function resetDatabase() {
  await init();
  sqlite.run(`DROP TABLE IF EXISTS comments; DROP TABLE IF EXISTS posts;`);
  sqlite.run(CREATE_TABLES_SQL);
  await persistDb();
}

export { posts, comments } from "./schema";
export type { Post, NewPost, Comment, NewComment } from "./schema";
