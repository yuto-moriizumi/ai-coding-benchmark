import Link from "next/link";

import { headers } from "next/headers";

async function getPosts() {
  const h = await headers();
  const host = h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  const base = `${proto}://${host}`;
  const res = await fetch(`${base}/api/articles`, { cache: "no-store" });
  return res.json();
}

export default async function Home() {
  const posts = await getPosts();
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <div className="flex gap-2">
        <form action="/api/reset" method="post">
          <button type="submit">Reset data</button>
        </form>
        <Link href="/new-post">Add new article</Link>
      </div>
      <ul>
        {posts.map((p: any) => (
          <li key={p.id}>
            <Link href={`/posts/${p.id}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
