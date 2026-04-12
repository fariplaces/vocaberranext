import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    // 1. Get Pagination params (No 'type' param used here!)
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const userId = searchParams.get("userId");

    const skip = (page - 1) * limit;

    // 2. Simple 'where' - only filters by user if provided
    const where = userId ? { userId } : {};

    // 3. Fetch Data & Total Count
    const [typings, totalCount] = await Promise.all([
      prisma.typing.findMany({
        where,
        skip,
        take: limit,
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
          createdAt: "desc", // Latest records first
        },
      }),
      prisma.typing.count({ where }),
    ]);

    const lastPage = Math.ceil(totalCount / limit);

    return NextResponse.json({
      data: typings,
      current_page: page,
      last_page: lastPage,
      total: totalCount,
    });
  } catch (error) {
    console.error("Fetch Error:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}