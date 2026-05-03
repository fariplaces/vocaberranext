import { prisma } from "@/lib/prisma";
import { typingDbServices } from "@/services/server/typingDbServices";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const params = {
      page: parseInt(searchParams.get("page")) || 1,
      limit: parseInt(searchParams.get("limit")) || 10,
      userId: searchParams.get("userId"),
    };

    const result = await typingDbServices.getPaginatedTypings(params);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Fetch Error:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
