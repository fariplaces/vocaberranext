import { prisma } from "@/lib/prisma";
import { typingDbServices } from "@/services/server/typingDbServices";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch exercise types and nest their related exercises
    const data = await typingDbServices.getExerciseTypes();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Fetch Exercise Types Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch exercise types" },
      { status: 500 },
    );
  }
}
