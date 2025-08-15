import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { createComment } from "@/app/actions";

export default async function PostPage({
  params,
}: {
  params: { id: string };
}) {
  const postId = Number(params.id);
  const post = await db.query.posts.findFirst({
    where: (posts, { eq }) => eq(posts.id, postId),
    with: {
      comments: true,
    },
  });

  if (!post) {
    return notFound();
  }

  return (
    <main className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <Link href="/" className="text-blue-500">
          Back to Blog
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <article className="prose lg:prose-xl mb-8">{post.content}</article>

      <section>
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <form action={createComment} className="flex flex-col gap-4 mb-8">
          <input type="hidden" name="postId" value={post.id} />
          <div>
            <label htmlFor="author" className="block mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="author"
              name="author"
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="content" className="block mb-1">
              Comment
            </label>
            <textarea
              id="content"
              name="content"
              className="w-full border rounded p-2"
              rows={3}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded self-start"
          >
            Submit
          </button>
        </form>
        <div className="space-y-4">
          {post.comments.map((comment) => (
            <div key={comment.id} className="p-4 border rounded">
              <p className="font-bold">{comment.author}</p>
              <p>{comment.content}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
