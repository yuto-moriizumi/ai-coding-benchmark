import { createPost } from "@/app/actions";
import Link from "next/link";

export default function NewPostPage() {
  return (
    <main className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">New Post</h1>
        <Link href="/" className="text-blue-500">
          Back to Blog
        </Link>
      </div>
      <form action={createPost} className="flex flex-col gap-4">
        <div>
          <label htmlFor="title" className="block mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block mb-1">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            className="w-full border rounded p-2"
            rows={5}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded self-start"
        >
          Publish Post
        </button>
      </form>
    </main>
  );
}
