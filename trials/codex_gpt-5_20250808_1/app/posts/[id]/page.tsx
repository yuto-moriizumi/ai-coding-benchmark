import Link from "next/link";
import { redirect } from "next/navigation";
import { db } from "../../../db/client";
import { comments, posts } from "../../../db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

type Params = { params: { id: string } };

export default async function PostPage({ params }: Params) {
  const id = Number(params.id);
  if (!Number.isFinite(id)) {
    return <main>Invalid post</main>;
  }

  const [post] = await db.select().from(posts).where(eq(posts.id, id));
  if (!post) {
    return (
      <main>
        <p>Post not found</p>
        <p>
          <Link href="/">Back to Blog</Link>
        </p>
      </main>
    );
  }

  const allComments = await db
    .select()
    .from(comments)
    .where(eq(comments.postId, id));

  async function submitComment(formData: FormData) {
    "use server";
    const name = String(formData.get("name") || "").trim();
    const content = String(formData.get("comment") || "").trim();
    if (!name || !content) return;
    await db.insert(comments).values({ postId: id, name, content, createdAt: new Date() });
    revalidatePath(`/posts/${id}`);
    redirect(`/posts/${id}`);
  }

  return (
    <main>
      <h1>{post.title}</h1>
      <article style={{ whiteSpace: "pre-wrap" }}>{post.content}</article>

      <section style={{ marginTop: 24 }}>
        <h2>Comments</h2>
        {allComments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          allComments.map((c) => (
            <div key={c.id} style={{ padding: 8, borderBottom: "1px solid #eee" }}>
              <strong>{c.name}</strong>
              <div>{c.content}</div>
            </div>
          ))
        )}
      </section>

      <section style={{ marginTop: 24 }}>
        <h3>Add a comment</h3>
        <form
          key={allComments.length}
          action={submitComment}
          style={{ display: "grid", gap: 8, maxWidth: 600 }}
        >
          <label htmlFor="name">Your Name</label>
          <input id="name" name="name" type="text" />

          <label htmlFor="comment">Comment</label>
          <textarea id="comment" name="comment" rows={4} />

          <button type="submit">Submit</button>
        </form>
      </section>

      <p style={{ marginTop: 16 }}>
        <Link href="/">Back to Blog</Link>
      </p>
    </main>
  );
}
