import Link from "next/link";
import { redirect } from "next/navigation";
import { getAllPosts, resetAll } from "../lib/repo";

export const dynamic = "force-dynamic";

async function resetAction() {
  "use server";
  resetAll();
  redirect("/");
}

export default async function Home() {
  const posts = getAllPosts();

  return (
    <div className="font-sans max-w-2xl mx-auto p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Blog</h1>
        <div className="flex gap-3">
          <form action={resetAction}>
            <button type="submit" className="underline">
              Reset data
            </button>
          </form>
          <Link href="/new-post" className="underline">
            Add new article
          </Link>
        </div>
      </header>

      <main className="space-y-4">
        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          <section className="space-y-3">
            {posts.map((p) => (
              <article key={p.id} className="border p-3 rounded">
                <h2 className="text-lg font-semibold">
                  <Link href={`/posts/${p.id}`} className="underline">
                    {p.title}
                  </Link>
                </h2>
              </article>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
