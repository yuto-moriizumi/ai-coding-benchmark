import Link from "next/link";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import ResetButton from "@/components/ResetButton";

export default async function Home() {
  const allPosts = await db.select().from(posts).orderBy(posts.createdAt);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog</h1>
        <div className="space-x-4">
          <Link
            href="/new-post"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add new article
          </Link>
          <ResetButton />
        </div>
      </div>

      <div className="space-y-6">
        {allPosts.map((post) => (
          <article key={post.id} className="border p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">
              <Link href={`/posts/${post.id}`} className="hover:text-blue-600">
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600 line-clamp-3">{post.content}</p>
            <div className="mt-4 text-sm text-gray-500">
              {new Date(post.createdAt || 0).toLocaleDateString()}
            </div>
          </article>
        ))}

        {allPosts.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            No posts yet. Create your first post!
          </p>
        )}
      </div>
    </div>
  );
}
