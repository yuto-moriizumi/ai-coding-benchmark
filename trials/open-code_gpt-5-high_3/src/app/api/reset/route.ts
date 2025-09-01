import { NextResponse } from "next/server";
import { db } from "@/db";
import { comments, posts } from "@/db/schema";

export async function POST() {
  // better-sqlite3 is sync; drizzle wrapper exposes sync under .run(). Using execute in a transaction
  db.transaction(() => {
    db.delete(comments).run();
    db.delete(posts).run();
  });
  return NextResponse.json({ ok: true });
}
