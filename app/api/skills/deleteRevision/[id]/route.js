import { skillDbServices } from "@/services/server/skillDbServices";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const deletedRevision = await skillDbServices.deleteRevision(id);

    return NextResponse.json({
      message: "Revision tracking removed successfully",
      topicTitle: deletedRevision.topic?.title || "Unknown Topic",
    });
  } catch (error) {
    // Capture our pre-mapped structured service errors seamlessly
    if (error.status) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }

    console.error("Delete Revision Route Error:", error);
    return NextResponse.json(
      { error: "Failed to delete revision record" },
      { status: 500 },
    );
  }
}
