import { typingDbServices } from "@/services/server/typingDbServices";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const query = {
      page: parseInt(searchParams.get("page")) || 1,
      limit: parseInt(searchParams.get("limit")) || 10,
      route: searchParams.get("type"), // 'exercises' or 'tests'
    };

    const result = await typingDbServices.getPaginatedExercises(query);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
