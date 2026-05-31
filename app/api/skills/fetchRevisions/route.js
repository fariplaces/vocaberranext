import { skillDbServices } from "@/services/server/skillDbServices";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const result = await skillDbServices.getRevisions();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Fetch Revisions Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch revisions with hierarchy" },
      { status: 500 },
    );
  }
}
