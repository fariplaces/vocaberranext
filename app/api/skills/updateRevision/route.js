import { skillDbServices } from "@/services/server/skillDbServices";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    const body = await req.json();

    const updatedRevision = await skillDbServices.updateRevision(body);

    return NextResponse.json(updatedRevision);
  } catch (error) {
    // Catch-all block for handled custom errors from our service context
    if (error.status) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }

    console.error("Update Revision Route Error:", error);
    return NextResponse.json(
      { error: "Failed to update revision progress" },
      { status: 500 },
    );
  }
}
