import { createPost } from "@/lib/db";
import { redirect } from "next/navigation";

export default function NewPostPage() {
  async function onCreate(formData: FormData) {
    "use server";
    const title = String(formData.get("title") || "").trim();
    const content = String(formData.get("content") || "").trim();
    const id = createPost(title, content);
    redirect(`/posts/${id}`);
  }

  return (
    <main className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">New Post</h1>
      <form action={onCreate} className="space-y-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="title">Title</label>
          <input id="title" name="title" className="border p-2" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            className="border p-2 min-h-40"
          />
        </div>
        <button type="submit" className="underline">
          Publish Post
        </button>
      </form>
    </main>
  );
}
