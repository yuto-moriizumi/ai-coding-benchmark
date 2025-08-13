import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';
import path from 'path';

const dbPath = path.join(process.cwd(), 'blog.db');
console.log('Database path:', dbPath);
const sqlite = new Database(dbPath);

// Disable foreign key constraints for testing flexibility
sqlite.pragma('foreign_keys = OFF');

export const db = drizzle(sqlite, { schema });