import Link from "next/link";

import { headers } from "next/headers";

async function getData(id: string) {
  const h = await headers();
  const host = h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  const base = `${proto}://${host}`;
  const res = await fetch(`${base}/api/articles/${id}`, { cache: "no-store" });
  return res.json();
}

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getData(id);
  const { post, comments } = data;
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <article className="prose whitespace-pre-wrap">{post.content}</article>
      <CommentForm id={post.id} />
      <div>
        {comments.map((c: any) => (
          <div key={c.id}>
            <div className="font-semibold">{c.author}</div>
            <div>{c.body}</div>
          </div>
        ))}
      </div>
      <Link href="/">Back to Blog</Link>
    </div>
  );
}

function CommentForm({ id }: { id: number }) {
  return (
    <form action={`/actions/comment`} method="post" className="space-y-2">
      <input type="hidden" name="postId" value={id} />
      <div>
        <label htmlFor="author">Your Name</label>
        <input id="author" name="author" className="block border p-2 w-full" />
      </div>
      <div>
        <label htmlFor="comment">Comment</label>
        <textarea id="comment" name="body" className="block border p-2 w-full" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
