import { redirect } from "next/navigation";
import Link from "next/link";
import { db, getSqlite } from "../../db/client";
import { posts } from "../../db/schema";

export default function NewPostPage() {
  async function publish(formData: FormData) {
    "use server";
    const title = String(formData.get("title") || "").trim();
    const content = String(formData.get("content") || "").trim();
    if (!title || !content) {
      // Minimal validation; stay on page if invalid
      return;
    }

    await db.insert(posts).values({ title, content, createdAt: new Date() });
    const row = getSqlite()
      .prepare("SELECT last_insert_rowid() as id")
      .get() as { id: number };
    redirect(`/posts/${row.id}`);
  }

  return (
    <main>
      <h1>New Post</h1>
      <form action={publish} style={{ display: "grid", gap: 8, maxWidth: 600 }}>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" type="text" />

        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows={6} />

        <button type="submit">Publish Post</button>
      </form>

      <p style={{ marginTop: 16 }}>
        <Link href="/">Back to Blog</Link>
      </p>
    </main>
  );
}

