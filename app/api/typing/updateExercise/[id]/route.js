import { typingDbServices } from "@/services/server/typingDbServices";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    // const body = await req.json();
    const { id } = await params;
    const body = await req.json();

    // 1. Basic Validation
    if (!id) {
      return NextResponse.json(
        { error: "Missing Exercise ID" },
        { status: 400 },
      );
    }

    // 2. Update Exercise
    const updatedExercise = await typingDbServices.updateExercise(id, body);

    return NextResponse.json(updatedExercise, { status: 200 });
  } catch (error) {
    console.error("Exercise Update Error:", error);

    // Handle not found
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Exercise not found" },
        { status: 404 },
      );
    }

    // Handle unique constraint (exerciseNo)
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Exercise number must be unique" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Failed to update exercise" },
      { status: 500 },
    );
  }
}
