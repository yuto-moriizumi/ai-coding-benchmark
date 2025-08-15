import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";

export default async function Home() {
  const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>

      <div className="mb-8 flex gap-4">
        <Link
          href="/new-post"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add new article
        </Link>

        <form action="/api/reset" method="POST">
          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Reset data
          </button>
        </form>
      </div>

      <div className="space-y-6">
        {allPosts.map((post) => (
          <article key={post.id} className="border p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">
              <Link href={`/posts/${post.id}`} className="hover:text-blue-600">
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600 mb-2">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <p>{post.content.substring(0, 150)}...</p>
          </article>
        ))}
      </div>
    </div>
  );
}
