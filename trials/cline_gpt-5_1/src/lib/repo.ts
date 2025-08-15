import { sqlite } from "./db";

export type Post = {
  id: number;
  title: string;
  content: string;
};

export type Comment = {
  id: number;
  postId: number;
  author: string;
  content: string;
};

export function getAllPosts(): Post[] {
  const rows = sqlite
    .prepare("SELECT id, title, content FROM posts ORDER BY id DESC")
    .all() as { id: number; title: string; content: string }[];
  return rows;
}

export function getPost(id: number): Post | undefined {
  const row = sqlite
    .prepare("SELECT id, title, content FROM posts WHERE id = ?")
    .get(id) as { id: number; title: string; content: string } | undefined;
  return row;
}

export function createPost(title: string, content: string): number {
  const info = sqlite
    .prepare("INSERT INTO posts (title, content) VALUES (?, ?)")
    .run(title, content);
  return Number(info.lastInsertRowid);
}

export function getComments(postId: number): Comment[] {
  const rows = sqlite
    .prepare(
      "SELECT id, post_id as postId, author, content FROM comments WHERE post_id = ? ORDER BY id ASC"
    )
    .all(postId) as { id: number; postId: number; author: string; content: string }[];
  return rows;
}

export function addComment(postId: number, author: string, content: string): number {
  const info = sqlite
    .prepare("INSERT INTO comments (post_id, author, content) VALUES (?, ?, ?)")
    .run(postId, author, content);
  return Number(info.lastInsertRowid);
}

export function resetAll(): void {
  sqlite.prepare("DELETE FROM comments").run();
  sqlite.prepare("DELETE FROM posts").run();
  try {
    // Reset AUTOINCREMENT counters so the next post id starts from 1
    sqlite
      .prepare("DELETE FROM sqlite_sequence WHERE name IN ('posts','comments')")
      .run();
  } catch {
    // ignore if sqlite_sequence doesn't exist
  }
}
