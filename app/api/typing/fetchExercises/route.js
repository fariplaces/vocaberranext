import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const exercises = await prisma.exercise.findMany({
      include: {
        lesson: true,
        type: true,
      },
    });
    return NextResponse.json(exercises);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch exercises" }, { status: 500 });
  }
}
