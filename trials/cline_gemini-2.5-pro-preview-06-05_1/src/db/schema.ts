import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const posts = sqliteTable("posts", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
});

export const comments = sqliteTable("comments", {
  id: integer("id").primaryKey(),
  postId: integer("post_id")
    .notNull()
    .references(() => posts.id),
  author: text("author").notNull(),
  content: text("content").notNull(),
});
