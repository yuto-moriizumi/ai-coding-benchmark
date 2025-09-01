"use server";

import { db } from "@/db";
import { posts, comments } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function resetData() {
  await db.delete(comments);
  await db.delete(posts);
  revalidatePath("/");
}

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!title || !content) {
    throw new Error("Title and content are required");
  }

  const result = await db
    .insert(posts)
    .values({
      title,
      content,
      createdAt: new Date(),
    })
    .returning({ id: posts.id });

  const postId = result[0].id;
  revalidatePath("/");
  redirect(`/posts/${postId}`);
}

export async function addComment(postId: number, formData: FormData) {
  const author = formData.get("author") as string;
  const content = formData.get("content") as string;

  if (!author || !content) {
    throw new Error("Author and content are required");
  }

  await db.insert(comments).values({
    postId,
    author,
    content,
    createdAt: new Date(),
  });

  revalidatePath(`/posts/${postId}`);
}
