import { typingDbServices } from "@/services/server/typingDbServices";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, exerciseId, durationId } = body;

    // 1. Basic Validation
    if (!userId || !exerciseId || !durationId) {
      return NextResponse.json(
        { error: "Missing required IDs" },
        { status: 400 },
      );
    }

    // 2. Create the record
    const newTyping = await typingDbServices.createTyping(body);

    return NextResponse.json({ data: newTyping }, { status: 201 });
  } catch (error) {
    console.error("Typing Save Error:", error);
    return NextResponse.json(
      { error: "Failed to save typing record" },
      { status: 500 },
    );
  }
}
