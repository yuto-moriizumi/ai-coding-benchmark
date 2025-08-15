import Link from "next/link";
import { redirect } from "next/navigation";
import { addComment, getComments, getPost } from "../../../lib/repo";

export const dynamic = "force-dynamic";

type PageProps = {
  params: { id: string };
};

async function addCommentAction(postId: number, formData: FormData) {
  "use server";
  const author = String(formData.get("author") ?? "").trim();
  const content = String(formData.get("comment") ?? "").trim();
  if (author && content) {
    addComment(postId, author, content);
  }
  redirect(`/posts/${postId}`);
}

export default async function PostDetailPage({ params }: PageProps) {
  const postId = Number(params.id);
  const post = getPost(postId);
  const comments = getComments(postId);

  return (
    <div className="font-sans max-w-2xl mx-auto p-6">
      <header className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Post</h2>
        <Link href="/" className="underline">
          Back to Blog
        </Link>
      </header>

      {post ? (
        <>
          <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
          <article className="border rounded p-4 mb-6 whitespace-pre-wrap">
            {post.content}
          </article>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-2">Post not found</h1>
          <article className="border rounded p-4 mb-6">This post does not exist.</article>
        </>
      )}

      <section className="mb-6">
        <h3 className="font-semibold mb-2">Comments</h3>
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          <ul className="space-y-2">
            {comments.map((c) => (
              <li key={c.id} className="border rounded p-3">
                <div className="font-medium">{c.author}</div>
                <div>{c.content}</div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h3 className="font-semibold mb-2">Add a comment</h3>
        <form action={addCommentAction.bind(null, postId)} className="space-y-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="author" className="font-medium">
              Your Name
            </label>
            <input id="author" name="author" className="border rounded px-3 py-2" />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="comment" className="font-medium">
              Comment
            </label>
            <textarea id="comment" name="comment" className="border rounded px-3 py-2 min-h-28" />
          </div>

          <button type="submit" className="underline">
            Submit
          </button>
        </form>
      </section>
    </div>
  );
}
