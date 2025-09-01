import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

async function getData(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/articles/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export default async function PostPage(ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const data = await getData(id);
  if (!data) return notFound();
  const { post, comments } = data;
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <article className="prose mb-6 whitespace-pre-wrap">{post.content}</article>
      <Link href="/" className="underline">Back to Blog</Link>
      <h2 className="text-xl font-semibold mt-6 mb-2">Comments</h2>
      <CommentForm id={post.id} />
      <ul className="mt-4 flex flex-col gap-2">
        {comments.map((c: any) => (
          <li key={c.id} className="border p-2"><strong>{c.author}</strong>: {c.body}</li>
        ))}
      </ul>
    </div>
  );
}

function CommentForm({ id }: { id: number }) {
  return (
    <form action={async (formData: FormData) => {
      'use server';
      const author = String(formData.get('author') || '');
      const body = String(formData.get('body') || '');
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: id, author, body })
      });
      redirect(`/posts/${id}`);
    }} className="flex flex-col gap-2 max-w-md">
      <label htmlFor="author">Your Name</label>
      <input id="author" name="author" className="border p-2" />
      <label htmlFor="body">Comment</label>
      <textarea id="body" name="body" className="border p-2" />
      <button type="submit" className="border px-3 py-2 w-fit">Submit</button>
    </form>
  );
}
