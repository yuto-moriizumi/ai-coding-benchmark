import Link from "next/link";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import ResetDataButton from "@/components/ResetDataButton";

export default async function Home() {
  const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Blog</h1>
        <div className="flex gap-4">
          <Link href="/new-post" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add new article
          </Link>
          <ResetDataButton />
        </div>
      </header>

      <main>
        {allPosts.length === 0 ? (
          <p className="text-gray-500">No articles yet.</p>
        ) : (
          <div className="space-y-6">
            {allPosts.map((post) => (
              <article key={post.id} className="border p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">
                  <Link href={`/posts/${post.id}`} className="hover:text-blue-600">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-2">{post.content.substring(0, 200)}...</p>
                <p className="text-sm text-gray-400">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
