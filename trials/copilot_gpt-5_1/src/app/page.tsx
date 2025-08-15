import Link from "next/link";
import { listPosts, resetAll } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function Home() {
  async function onReset() {
    "use server";
    resetAll();
    redirect("/");
  }

  const posts = listPosts();

  return (
    <main className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Blog</h1>
      <div className="flex gap-3">
        <Link href="/new-post" className="underline">
          Add new article
        </Link>
        <form action={onReset}>
          <button type="submit" className="underline">
            Reset data
          </button>
        </form>
      </div>

      <section className="space-y-4">
        {posts.map((p) => (
          <article key={p.id} className="border p-3 rounded">
            <h2 className="font-semibold">
              <Link href={`/posts/${p.id}`}>{p.title}</Link>
            </h2>
            <p className="opacity-80 line-clamp-3">{p.content}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
