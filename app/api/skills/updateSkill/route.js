import { skillDbServices } from "@/services/server/skillDbServices";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    const body = await req.json();

    const updatedSkill = await skillDbServices.updateSkill(body);

    return NextResponse.json(updatedSkill);
  } catch (error) {
    // Structural catch block for handled operational service throws
    if (error.status) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }

    console.error("Update Skill Route Error:", error);
    return NextResponse.json(
      { error: "Failed to update skill" },
      { status: 500 },
    );
  }
}
