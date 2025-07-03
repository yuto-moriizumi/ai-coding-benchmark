import Link from "next/link";
import { db } from "@/db";
import { posts } from "@/db/schema";

export default async function Home() {
  const allPosts = await db.select().from(posts);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog</h1>
        <div className="flex gap-4">
          <Link
            href="/new-post"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add new article
          </Link>
          <form action="/api/reset" method="POST">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Reset data
            </button>
          </form>
        </div>
      </div>
      
      <div className="space-y-4">
        {allPosts.map((post) => (
          <article key={post.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.content}</p>
            <Link
              href={`/posts/${post.id}`}
              className="text-blue-500 hover:underline"
            >
              Read more
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
