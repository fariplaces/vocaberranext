import { skillDbServices } from "@/services/server/skillDbServices";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || 1;
    const limit = searchParams.get("limit") || 10;

    const result = await skillDbServices.getPaginatedRevisions({ page, limit });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Fetch Revisions Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch revisions with hierarchy" },
      { status: 500 },
    );
  }
}
