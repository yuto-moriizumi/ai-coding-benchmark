import { db } from '@/db/config';
import { posts, comments } from '@/db/schema';
import { eq, desc, sql } from 'drizzle-orm';

export async function getAllPosts() {
  return await db.select().from(posts).orderBy(desc(posts.createdAt));
}

export async function getPostById(id: number) {
  const post = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
  return post[0] || null;
}

export async function createPost(title: string, content: string) {
  const result = await db.insert(posts).values({ title, content }).returning({ id: posts.id });
  return result[0];
}

export async function getCommentsByPostId(postId: number) {
  return await db.select().from(comments).where(eq(comments.postId, postId)).orderBy(comments.createdAt);
}

export async function createComment(postId: number, name: string, content: string) {
  return await db.insert(comments).values({ postId, name, content });
}

export async function resetAllData() {
  await db.delete(comments);
  await db.delete(posts);
  
  // Reset auto-increment counters
  await db.run(sql`DELETE FROM sqlite_sequence WHERE name IN ('posts', 'comments')`);
}