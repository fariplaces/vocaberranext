import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, exerciseId, durationId, accuracy, gross, net } = body;

    // 1. Basic Validation
    if (!userId || !exerciseId || !durationId) {
      return NextResponse.json(
        { error: "Missing required IDs" },
        { status: 400 }
      );
    }

    // 2. Create the record
    const newTyping = await prisma.typing.create({
      data: {
        userId,
        exerciseId,
        durationId,
        // Ensure numbers are stored correctly
        accuracy: parseFloat(accuracy),
        gross: parseInt(gross),
        net: parseInt(net),
      },
      // Include relations if you want to return the full object to the frontend
      include: {
        exercise: {
          select: { title: true, exerciseNo: true, lesson: true },
        },
        duration: true,
      },
    });

    return NextResponse.json(newTyping, { status: 201 });
  } catch (error) {
    console.error("Typing Save Error:", error);
    return NextResponse.json(
      { error: "Failed to save typing record" },
      { status: 500 }
    );
  }
}
