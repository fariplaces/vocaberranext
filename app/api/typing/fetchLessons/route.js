import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch lessons and nest their related exercises inside them
    const data = await prisma.lesson.findMany({
      include: {
        exercises: {
          include: {
            type: true, // Also include the 'type' (exercise vs test)
          },
          orderBy: {
            exerciseNo: 'asc', // Optional: Keep them in order (1.2, 1.4, etc)
          }
        },
      },
      orderBy: {
        lesson: 'asc' // Keeps Lesson 1, Lesson 2, etc. in order
      }
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Fetch Error:", error);
    return NextResponse.json({ error: "Failed to fetch grouped data" }, { status: 500 });
  }
}
