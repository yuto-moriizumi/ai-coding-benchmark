import { NextResponse } from "next/server";
import { db } from "@/db";
import { comments } from "@/db/schema";

export async function POST(req: Request) {
  const body = await req.json();
  const postId = Number(body.postId);
  const author = String(body.author || "").trim();
  const text = String(body.body || "").trim();
  if (!Number.isFinite(postId) || !author || !text) {
    return NextResponse.json({ error: "invalid input" }, { status: 400 });
  }
  const result = db.insert(comments).values({ postId, author, body: text }).run();
  const id = Number(result.lastInsertRowid);
  return NextResponse.json({ id }, { status: 201 });
}
