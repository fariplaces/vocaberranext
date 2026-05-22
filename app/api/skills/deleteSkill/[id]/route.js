import { skillDbServices } from "@/services/server/skillDbServices";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const deletedSkill = await skillDbServices.deleteSkill(id);

    return NextResponse.json({
      message: "Skill deleted successfully",
      deletedSkill,
    });
  } catch (error) {
    // Intercept operational service-level custom throws
    if (error.status) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }

    console.error("Delete Skill Route Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during deletion" },
      { status: 500 },
    );
  }
}
