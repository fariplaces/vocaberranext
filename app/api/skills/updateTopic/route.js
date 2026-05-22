import { skillDbServices } from "@/services/server/skillDbServices";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    const body = await req.json();

    const updatedTopic = await skillDbServices.updateTopic(body);

    return NextResponse.json(updatedTopic);
  } catch (error) {
    // Structural catch-all block for handled custom errors from our service context
    if (error.status) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }

    console.error("Update Topic Route Error:", error);
    return NextResponse.json(
      { error: "Failed to update topic" },
      { status: 500 },
    );
  }
}
