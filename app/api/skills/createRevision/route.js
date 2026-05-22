import { skillDbServices } from "@/services/server/skillDbServices";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const newRevision = await skillDbServices.createRevision(body);

    return NextResponse.json(newRevision, { status: 201 });
  } catch (error) {
    // Return structured API validation throws immediately
    if (error.status) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }

    console.error("Create Revision Route Error:", error);
    return NextResponse.json(
      { error: "Failed to initialize revision tracking" },
      { status: 500 },
    );
  }
}
