import Link from 'next/link';
import { db, runMigrations } from '@/lib/db';
import { posts } from '@/lib/db/schema';
import { ResetDataButton } from '@/components/ResetDataButton';

export default async function Home() {
  runMigrations();
  
  const allPosts = await db.select().from(posts).orderBy(posts.createdAt);

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog</h1>
        <div className="flex gap-4">
          <Link
            href="/new-post"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add new article
          </Link>
          <ResetDataButton />
        </div>
      </div>

      <div className="space-y-4">
        {allPosts.map((post) => (
          <article key={post.id} className="border p-4 rounded-lg">
            <Link href={`/posts/${post.id}`} className="hover:underline">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600">{post.content.substring(0, 200)}...</p>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
