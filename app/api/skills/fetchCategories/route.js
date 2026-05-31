import { skillDbServices } from "@/services/server/skillDbServices";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const result = await skillDbServices.getCategories();

    return NextResponse.json({
      ...result,
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
