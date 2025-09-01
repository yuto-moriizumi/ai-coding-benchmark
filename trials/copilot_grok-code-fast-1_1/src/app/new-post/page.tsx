import { db } from "../../db";
import { articles } from "../../db/schema";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";

async function createPost(formData: FormData) {
  "use server";
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  const result = await db
    .insert(articles)
    .values({ title, content })
    .returning({ id: articles.id });
  const id = result[0].id;

  revalidatePath("/");
  redirect(`/posts/${id}`);
}

export default function NewPost() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Add New Article</h1>
      <form action={createPost} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            required
            rows={10}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="space-x-4">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Publish Post
          </button>
          <Link href="/" className="bg-gray-500 text-white px-4 py-2 rounded">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
