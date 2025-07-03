import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { posts, comments } from "./schema";

const sqlite = new Database("sqlite.db");
export const db = drizzle(sqlite);

export { posts, comments } from "./schema";
export type { Post, NewPost, Comment, NewComment } from "./schema";