import { db } from "../lib/database";
import Link from "next/link";

export default async function Home() {
  const allPosts = db.getAllPosts();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog</h1>
        <div className="space-x-4">
          <Link
            href="/new-post"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add new article
          </Link>
          <form action="/api/reset" method="POST" className="inline">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Reset data
            </button>
          </form>
        </div>
      </div>

      <div className="space-y-6">
        {allPosts.map((post) => (
          <article
            key={post.id}
            className="border border-gray-200 p-6 rounded-lg"
          >
            <h2 className="text-xl font-semibold mb-2">
              <Link href={`/posts/${post.id}`} className="hover:text-blue-600">
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600 line-clamp-3">{post.content}</p>
            <p className="text-sm text-gray-500 mt-2">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </article>
        ))}

        {allPosts.length === 0 && (
          <p className="text-gray-500 text-center py-8">
            No posts yet. Create your first post!
          </p>
        )}
      </div>
    </div>
  );
}
