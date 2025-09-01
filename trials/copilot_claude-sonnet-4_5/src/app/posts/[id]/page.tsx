import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { posts, comments } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import CommentForm from "@/components/CommentForm";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postId = parseInt(id);

  if (isNaN(postId)) {
    notFound();
  }

  const post = await db
    .select()
    .from(posts)
    .where(eq(posts.id, postId))
    .limit(1);

  if (post.length === 0) {
    notFound();
  }

  const postComments = await db
    .select()
    .from(comments)
    .where(eq(comments.postId, postId))
    .orderBy(comments.createdAt);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-8">
        <Link href="/" className="text-blue-500 hover:text-blue-600">
          Back to Blog
        </Link>
      </div>

      <article className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{post[0].title}</h1>
        <div className="text-gray-600 mb-6">
          {new Date(post[0].createdAt || 0).toLocaleDateString()}
        </div>
        <div className="prose max-w-none">
          {post[0].content.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </article>

      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-6">Comments</h2>

        <CommentForm postId={postId} />

        <div className="mt-8 space-y-4">
          {postComments.map((comment) => (
            <div key={comment.id} className="border p-4 rounded-lg">
              <div className="font-semibold mb-2">{comment.name}</div>
              <div className="text-gray-700 mb-2">{comment.content}</div>
              <div className="text-sm text-gray-500">
                {new Date(comment.createdAt || 0).toLocaleDateString()}
              </div>
            </div>
          ))}

          {postComments.length === 0 && (
            <p className="text-gray-500">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
