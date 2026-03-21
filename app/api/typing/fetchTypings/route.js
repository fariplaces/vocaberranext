import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // 1. Get userId from query params if you want to filter by user
    // e.g., /api/typings?userId=123
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const where = userId ? { userId } : {};

    // 2. Fetch records with relations
    const typings = await prisma.typing.findMany({
      where,
      include: {
        exercise: {
          select: { title: true, exerciseNo: true, lesson: true },
        },
        duration: {
          select: { duration: true },
        },
        user: {
          select: { name: true },
        },
      },
      orderBy: {
        createdAt: "desc", // Newest first
      },
    });

    return NextResponse.json(typings);
  } catch (error) {
    console.error("Fetch Typings Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch typing records" },
      { status: 500 }
    );
  }
}
