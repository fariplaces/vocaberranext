import { typingDbServices } from "@/services/server/typingDbServices";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch lessons and nest their related exercises inside them
    const data = await typingDbServices.getLessons();

    return NextResponse.json({ data: data });
  } catch (error) {
    console.error("Fetch Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch grouped data" },
      { status: 500 },
    );
  }
}
