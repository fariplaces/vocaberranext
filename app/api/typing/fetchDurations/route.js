import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const durations = await prisma.duration.findMany();
    return NextResponse.json(durations);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch Durations" }, { status: 500 });
  }
}
