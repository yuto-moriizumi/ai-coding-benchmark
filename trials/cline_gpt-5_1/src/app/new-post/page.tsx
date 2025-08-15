import Link from "next/link";
import { redirect } from "next/navigation";
import { createPost } from "../../lib/repo";

export const dynamic = "force-dynamic";

async function publishAction(formData: FormData) {
  "use server";
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const id = createPost(title, content);
  redirect(`/posts/${id}`);
}

export default function NewPostPage() {
  return (
    <div className="font-sans max-w-2xl mx-auto p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">New Post</h1>
        <Link href="/" className="underline">
          Back to Blog
        </Link>
      </header>

      <form action={publishAction} className="space-y-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="font-medium">
            Title
          </label>
          <input
            id="title"
            name="title"
            className="border rounded px-3 py-2"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="content" className="font-medium">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            className="border rounded px-3 py-2 min-h-36"
            required
          />
        </div>

        <button type="submit" className="underline">
          Publish Post
        </button>
      </form>
    </div>
  );
}
