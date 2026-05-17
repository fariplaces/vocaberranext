import { prisma } from "@/lib/prisma";
import { skillServices } from "@/services/client/skillServices";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || 1;
    const limit = searchParams.get("limit") || 10;

    const result = await skillServices.getPaginatedCategories({
      page,
      limit,
    });

    return NextResponse.json({
      data: result,
      message: "Categories fetched successfully!",
      status: 200,
    });
  } catch (error) {
    console.error("Fetch All Categories Error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch categories",
        message: error || "An error occurred",
      },
      { status: 500 },
    );
  }
}
