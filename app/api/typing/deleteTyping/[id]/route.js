import { typingDbServices } from "@/services/server/typingDbServices";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    // 1. You must await params in Next.js 15+
    const resolvedParams = await params;
    const { id } = resolvedParams;

    if (!id) {
      return NextResponse.json({ error: "No ID provided" }, { status: 400 });
    }

    // 2. Perform the delete using the extracted ID
    await typingDbServices.deleteTyping(id);

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
