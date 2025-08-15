import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const articles = sqliteTable("articles", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
});

export const comments = sqliteTable("comments", {
  id: integer("id").primaryKey(),
  articleId: integer("article_id")
    .notNull()
    .references(() => articles.id),
  author: text("author").notNull(),
  content: text("content").notNull(),
});
