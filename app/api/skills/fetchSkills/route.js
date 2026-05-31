import { skillDbServices } from "@/services/server/skillDbServices";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const result = await skillDbServices.getSkills();

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
