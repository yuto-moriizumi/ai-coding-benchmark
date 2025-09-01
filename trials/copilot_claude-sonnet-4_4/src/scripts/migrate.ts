import Database from "sqlite3";
import { drizzle } from "drizzle-orm/sqlite-proxy";
import { migrate } from "drizzle-orm/sqlite-proxy/migrator";

const sqliteDB = new Database.Database("./blog.db");

const db = drizzle(async (sql: string, params: any[]) => {
  return new Promise((resolve, reject) => {
    sqliteDB.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve({ rows: rows || [] });
      }
    });
  });
});

async function runMigrations() {
  try {
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("Migrations completed successfully");
  } catch (error) {
    console.error("Migration failed:", error);
  }
  sqliteDB.close();
}

runMigrations();
