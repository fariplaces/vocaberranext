import { skillDbServices } from "@/services/server/skillDbServices";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || 1;
    const limit = searchParams.get("limit") || 10;

    const result = await skillDbServices.getPaginatedSkills({
      page,
      limit,
    });

    return NextResponse.json({
      ...result,
      message: "Skills fetched successfully",
    });
  } catch (error) {
    console.error("Fetch Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 },
    );
  }
}
