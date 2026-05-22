import { skillDbServices } from "@/services/server/skillDbServices";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || 1;
    const limit = searchParams.get("limit") || 10;

    const result = await skillDbServices.getPaginatedTopics({ page, limit });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Fetch Topics Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch topics with hierarchy" },
      { status: 500 },
    );
  }
}
