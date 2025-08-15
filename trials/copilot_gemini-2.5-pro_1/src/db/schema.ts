import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const posts = sqliteTable("posts", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
});

export const postsRelations = relations(posts, ({ many }) => ({
  comments: many(comments),
}));

export const comments = sqliteTable("comments", {
  id: integer("id").primaryKey(),
  postId: integer("post_id")
    .notNull()
    .references(() => posts.id),
  author: text("author").notNull(),
  content: text("content").notNull(),
});

export const commentsRelations = relations(comments, ({ one }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
}));