import Link from "next/link";
import { revalidatePath } from "next/cache";
import { db, resetDatabase } from "../db/client";
import { posts } from "../db/schema";
import { desc } from "drizzle-orm";

async function getAllPosts() {
  return db.select().from(posts).orderBy(desc(posts.id));
}

export default async function Home() {
  const allPosts = await getAllPosts();

  async function resetAction() {
    "use server";
    resetDatabase();
    revalidatePath("/");
  }

  return (
    <main>
      <h1>Blog</h1>

      <form action={resetAction} style={{ marginBottom: 16 }}>
        <button type="submit">Reset data</button>
      </form>

      <p>
        <Link href="/new-post">Add new article</Link>
      </p>

      <section>
        {allPosts.map((p) => (
          <article key={p.id} style={{ borderBottom: "1px solid #ddd", padding: 8 }}>
            <h2 style={{ margin: 0 }}>
              <Link href={`/posts/${p.id}`}>{p.title}</Link>
            </h2>
          </article>
        ))}
      </section>
    </main>
  );
}

