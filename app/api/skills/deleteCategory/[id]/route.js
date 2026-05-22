import { skillDbServices } from "@/services/server/skillDbServices";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    // Await params if you're on a newer Next.js version (like Next 15+)
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const deletedCategory = await skillDbServices.deleteCategory(id);

    return NextResponse.json({
      message: "Category deleted successfully",
      deletedCategory,
    });
  } catch (error) {
    // Intercept operational service errors (400, 404, etc.)
    if (error.status) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }

    console.error("Delete Category Route Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during deletion" },
      { status: 500 },
    );
  }
}
