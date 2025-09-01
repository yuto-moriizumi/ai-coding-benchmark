import Link from "next/link";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { resetData } from "./actions";

export default async function Home() {
  const allPosts = await db.select().from(posts).orderBy(posts.createdAt);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>

      <div className="mb-8 space-x-4">
        <form action={resetData} className="inline">
          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Reset data
          </button>
        </form>

        <Link
          href="/new-post"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-block"
        >
          Add new article
        </Link>
      </div>

      <div className="space-y-4">
        {allPosts.map((post) => (
          <article key={post.id} className="border p-4 rounded">
            <Link
              href={`/posts/${post.id}`}
              className="text-xl font-semibold hover:underline"
            >
              {post.title}
            </Link>
            <p className="text-gray-600 mt-2">
              {post.content.substring(0, 100)}...
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
