import { db } from "@/lib/db";
import { posts, comments } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
  "use server";
  const { title, content } = Object.fromEntries(formData.entries());
  const newPost = await db
    .insert(posts)
    .values({
      title: title as string,
      content: content as string,
    })
    .returning();
  revalidatePath("/");
  redirect(`/posts/${newPost[0].id}`);
}

export async function createComment(formData: FormData) {
  "use server";
  const { postId, author, content } = Object.fromEntries(formData.entries());
  await db.insert(comments).values({
    postId: Number(postId),
    author: author as string,
    content: content as string,
  });
  revalidatePath(`/posts/${postId}`);
}

export async function resetData() {
  "use server";
  await db.delete(comments);
  await db.delete(posts);
  revalidatePath("/");
}
