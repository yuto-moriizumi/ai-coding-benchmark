import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { posts, comments } from "@/db/schema";
import { eq } from "drizzle-orm";
import CommentForm from "./CommentForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: PageProps) {
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

  const currentPost = post[0];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Link
        href="/"
        className="text-blue-500 hover:underline mb-4 inline-block"
      >
        ← Back to Blog
      </Link>

      <article className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{currentPost.title}</h1>
        <div className="prose max-w-none">
          {currentPost.content.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </article>

      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>

        <CommentForm postId={postId} />

        <div className="space-y-4">
          {postComments.map((comment) => (
            <div key={comment.id} className="border p-4 rounded">
              <div className="font-semibold">{comment.author}</div>
              <div className="mt-2">{comment.content}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
