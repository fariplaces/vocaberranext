import { skillDbServices } from "@/services/server/skillDbServices";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const newSkill = await skillDbServices.createSkill(body);

    return NextResponse.json(newSkill, { status: 201 });
  } catch (error) {
    // Intercept expected service operational throws
    if (error.status) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }

    console.error("Create Skill Route Error:", error);
    return NextResponse.json(
      { error: "Failed to create skill" },
      { status: 500 },
    );
  }
}
