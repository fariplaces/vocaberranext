// app/api/exercise/deleteExercise/[id]/route.js
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    // 1. Await params (Next.js 15+)
    const resolvedParams = await params;
    const { id } = resolvedParams;

    if (!id) {
      return NextResponse.json(
        { error: "No ID provided" },
        { status: 400 }
      );
    }

    // 2. Delete Exercise
    await prisma.exercise.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: "Exercise deleted successfully" });
  } catch (error) {
    console.error("Exercise Delete Error:", error);

    // Optional: handle record not found
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Exercise not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}