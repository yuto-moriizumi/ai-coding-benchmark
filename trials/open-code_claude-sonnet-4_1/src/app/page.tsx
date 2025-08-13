import Link from "next/link";
import { db, rawDb } from "../lib/db";
import { posts, comments } from "../lib/schema";
import { redirect } from "next/navigation";
import { desc } from "drizzle-orm";

async function resetData() {
  'use server';
  await db.delete(comments);
  await db.delete(posts);
  // Reset auto-increment counter
  rawDb.exec("DELETE FROM sqlite_sequence WHERE name IN ('posts', 'comments')");
  redirect('/');
}

export default async function Home() {
  const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      
      <div className="mb-8 flex gap-4">
        <Link 
          href="/new-post"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add new article
        </Link>
        
        <form action={resetData}>
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
              <Link href={`/posts/${post.id}`} className="hover:underline">
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600 line-clamp-3">{post.content}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
