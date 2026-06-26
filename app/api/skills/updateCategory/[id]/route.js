import { skillDbServices } from "@/services/server/skillDbServices";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    console.log(id);
    const body = await req.json();

    const updatedCategory = await skillDbServices.updateCategory(id, body);

    return NextResponse.json(updatedCategory);
  } catch (error) {
    // Automatically catch structured operational errors (400, 404, etc.)
    if (error.status) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }

    console.error("Update Category Route Error:", error);
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 },
    );
  }
}
