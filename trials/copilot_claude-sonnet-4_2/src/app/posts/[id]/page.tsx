import { db } from "@/lib/db";
import { posts, comments } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import CommentForm from "./CommentForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: Props) {
  const { id } = await params;
  const postId = parseInt(id);

  if (isNaN(postId)) {
    notFound();
  }

  const [post] = await db.select().from(posts).where(eq(posts.id, postId));

  if (!post) {
    notFound();
  }

  const postComments = await db
    .select()
    .from(comments)
    .where(eq(comments.postId, postId))
    .orderBy(desc(comments.createdAt));

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="text-blue-500 hover:text-blue-600 mb-6 inline-block"
      >
        Back to Blog
      </Link>

      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-6">
        {new Date(post.createdAt).toLocaleDateString()}
      </p>

      <article className="prose max-w-none mb-8">
        <div className="whitespace-pre-wrap">{post.content}</div>
      </article>

      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-6">Comments</h2>

        <CommentForm postId={postId} />

        <div className="space-y-4 mt-8">
          {postComments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <strong className="font-semibold">{comment.name}</strong>
                <span className="text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="whitespace-pre-wrap">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
