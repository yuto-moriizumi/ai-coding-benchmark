"use client";

import { addComment } from "../../actions";

interface CommentFormProps {
  postId: number;
}

export default function CommentForm({ postId }: CommentFormProps) {
  return (
    <form action={addComment.bind(null, postId)} className="mb-8 space-y-4">
      <div>
        <label htmlFor="author" className="block text-sm font-medium mb-2">
          Your Name
        </label>
        <input
          type="text"
          id="author"
          name="author"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium mb-2">
          Comment
        </label>
        <textarea
          id="content"
          name="content"
          required
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
}
