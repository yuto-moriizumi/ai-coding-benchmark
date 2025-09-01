import { db } from "../../../db";
import { articles, comments } from "../../../db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";

async function addComment(formData: FormData) {
  "use server";
  const id = parseInt(formData.get("id") as string);
  const author = formData.get("author") as string;
  const content = formData.get("content") as string;

  await db.insert(comments).values({ articleId: id, author, content });

  revalidatePath(`/posts/${id}`);
}

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = await params;
  const id = parseInt(idStr);
  if (isNaN(id)) notFound();

  const article = await db
    .select()
    .from(articles)
    .where(eq(articles.id, id))
    .limit(1);
  if (article.length === 0) notFound();

  const postComments = await db
    .select()
    .from(comments)
    .where(eq(comments.articleId, id))
    .orderBy(comments.createdAt);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Link
        href="/"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        Back to Blog
      </Link>
      <article className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{article[0].title}</h1>
        <p className="text-gray-600 mb-4">
          {new Date(article[0].createdAt).toLocaleDateString()}
        </p>
        <div className="prose">{article[0].content}</div>
      </article>

      <section>
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <form action={addComment} className="space-y-4 mb-8">
          <input type="hidden" name="id" value={id} />
          <div>
            <input
              type="text"
              name="author"
              required
              aria-label="Your Name"
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <textarea
              name="content"
              required
              rows={4}
              aria-label="Comment"
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>

        <div className="space-y-4">
          {postComments.map((comment) => (
            <div key={comment.id} className="border p-4 rounded">
              <p className="font-semibold">{comment.author}</p>
              <p>{comment.content}</p>
              <p className="text-sm text-gray-500">
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
