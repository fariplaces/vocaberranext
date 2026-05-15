import { typingDbServices } from "@/services/server/typingDbServices";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const body = await req.json();
    // const { , ...updateData } = body;

    // 1. Basic Validation
    if (!id) {
      return NextResponse.json({ error: "Missing Record ID" }, { status: 400 });
    }

    // 2. Update the record
    const updatedTyping = await typingDbServices.updateTyping(id, body);

    return NextResponse.json(
      { data: updatedTyping, message: "Recored Updated Successfully!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Typing Update Error:", error);
    return NextResponse.json(
      { error: "Failed to update typing record" },
      { status: 500 },
    );
  }
}
