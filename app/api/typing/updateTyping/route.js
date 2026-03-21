import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { id, userId, exerciseId, durationId, accuracy, gross, net } = body;

    // 1. Basic Validation
    if (!id) {
      return NextResponse.json({ error: "Missing Record ID" }, { status: 400 });
    }

    // 2. Update the record
    const updatedTyping = await prisma.typing.update({
      where: { id: id },
      data: {
        userId,
        exerciseId,
        durationId,
        accuracy: parseFloat(accuracy),
        gross: parseInt(gross),
        net: parseInt(net),
      },
      include: {
        exercise: {
          select: { title: true, exerciseNo: true, lesson: true },
        },
        duration: true,
      },
    });

    return NextResponse.json(updatedTyping, { status: 200 });
  } catch (error) {
    console.error("Typing Update Error:", error);
    return NextResponse.json(
      { error: "Failed to update typing record" },
      { status: 500 }
    );
  }
}
