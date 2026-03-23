import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { id, title, exerciseNo, typeId, lessonId } = body;

    // 1. Basic Validation
    if (!id) {
      return NextResponse.json(
        { error: "Missing Exercise ID" },
        { status: 400 }
      );
    }

    // 2. Update Exercise
    const updatedExercise = await prisma.exercise.update({
      where: { id: id },
      data: {
        title,
        exerciseNo,
        typeId,
        lessonId,
      },
      include: {
        type: true,
        lesson: true,
      },
    });

    return NextResponse.json(updatedExercise, { status: 200 });
  } catch (error) {
    console.error("Exercise Update Error:", error);

    // Handle not found
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Exercise not found" },
        { status: 404 }
      );
    }

    // Handle unique constraint (exerciseNo)
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Exercise number must be unique" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update exercise" },
      { status: 500 }
    );
  }
}