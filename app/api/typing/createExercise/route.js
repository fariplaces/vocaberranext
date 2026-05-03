import { typingDbServices } from "@/services/server/typingDbServices";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, exerciseNo, typeId, lessonId } = body;

// 1. Basic Validation
    if (!title || !exerciseNo || !typeId || !lessonId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // 2. Create Exercise
     const newExercise = await typingDbServices.createExercise(body);


    return NextResponse.json(newExercise, { status: 201 });
  } catch (error) {
    console.error("Exercise Create Error:", error);

    // Handle unique constraint error (exerciseNo)
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Exercise number must be unique" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create exercise" },
      { status: 500 }
    );
  }
}