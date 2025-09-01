import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.formData();
  const postId = body.get("postId");
  const author = body.get("author");
  const text = body.get("body");
  const res = await fetch(new URL("/api/comments", req.url), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ postId, author, body: text }),
  });
  if (!res.ok) return NextResponse.json(await res.json(), { status: res.status });
  // redirect back to the post page
  const id = postId as string;
  return NextResponse.redirect(new URL(`/posts/${id}`, req.url));
}
