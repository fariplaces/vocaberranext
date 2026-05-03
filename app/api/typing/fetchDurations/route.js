import { typingDbServices } from "@/services/server/typingDbServices";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const durations = await typingDbServices.getDurations();
    return NextResponse.json({ data: durations });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch Durations" },
      { status: 500 },
    );
  }
}
