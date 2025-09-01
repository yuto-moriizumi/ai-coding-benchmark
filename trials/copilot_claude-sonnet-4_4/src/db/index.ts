import Database from "sqlite3";
import { drizzle } from "drizzle-orm/sqlite-proxy";
import * as schema from "./schema";

// Create a simple proxy adapter for sqlite3
const sqliteDB = new Database.Database("./blog.db");

const db = drizzle(
  async (sql: string, params: any[]) => {
    return new Promise((resolve, reject) => {
      sqliteDB.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve({ rows: rows || [] });
        }
      });
    });
  },
  { schema }
);

export { db };
