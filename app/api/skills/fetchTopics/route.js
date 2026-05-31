import { skillDbServices } from "@/services/server/skillDbServices";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const result = await skillDbServices.getTopics();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Fetch Topics Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch topics with hierarchy" },
      { status: 500 },
    );
  }
}
