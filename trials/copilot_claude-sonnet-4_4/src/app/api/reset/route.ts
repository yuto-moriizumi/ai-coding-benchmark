import { NextResponse } from "next/server";
import { db } from "../../../lib/database";

export async function POST() {
  try {
    db.resetAllData();

    return NextResponse.json({ message: "All data has been reset" });
  } catch (error) {
    console.error("Error resetting data:", error);
    return NextResponse.json(
      { error: "Failed to reset data" },
      { status: 500 }
    );
  }
}
