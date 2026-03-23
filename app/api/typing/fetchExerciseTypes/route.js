import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch exercise types and nest their related exercises
    const data = await prisma.exerciseType.findMany({
      include: {
        exercises: {
          include: {
            lesson: true, // include lesson info (optional but useful)
          },
          orderBy: {
            exerciseNo: "asc", // keep exercises ordered
          },
        },
      },
      orderBy: {
        type: "asc", // sort types alphabetically
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Fetch Exercise Types Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch exercise types" },
      { status: 500 }
    );
  }
}