import { skillDbServices } from "@/services/server/skillDbServices";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const deletedTopic = await skillDbServices.deleteTopic(id);

    return NextResponse.json({
      message: "Topic deleted successfully",
      deletedTopic,
    });
  } catch (error) {
    // Gracefully catch mapped database exception states
    if (error.status) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }

    console.error("Delete Topic Route Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during deletion" },
      { status: 500 },
    );
  }
}
