import Link from "next/link";
import { addComment, getPost, listComments } from "@/lib/db";
import { notFound, redirect } from "next/navigation";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postId = Number(id);
  const post = getPost(postId);
  if (!post) return notFound();
  const comments = listComments(postId);

  async function onAddComment(form: FormData) {
    "use server";
    const author = String(form.get("author") || "").trim();
    const body = String(form.get("body") || "").trim();
    addComment(postId, author, body);
    redirect(`/posts/${postId}`);
  }

  return (
    <main className="p-6 max-w-2xl mx-auto space-y-4">
      <Link href="/" className="underline">
        Back to Blog
      </Link>
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <article className="border p-3 rounded whitespace-pre-wrap">
        {post.content}
      </article>

      <section className="space-y-2">
        <h2 className="font-semibold">Comments</h2>
        {comments.length === 0 && <p className="opacity-70">No comments yet</p>}
        <ul className="space-y-2">
          {comments.map((c) => (
            <li key={c.id} className="border p-2 rounded">
              <p className="text-sm font-medium">{c.author}</p>
              <p>{c.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <h3 className="font-semibold">Add Comment</h3>
        <form action={onAddComment} className="space-y-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="author">Your Name</label>
            <input id="author" name="author" className="border p-2" />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="body">Comment</label>
            <textarea id="body" name="body" className="border p-2 min-h-24" />
          </div>
          <button type="submit" className="underline">
            Submit
          </button>
        </form>
      </section>
    </main>
  );
}
