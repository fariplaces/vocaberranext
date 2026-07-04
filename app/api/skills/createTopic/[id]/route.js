import { skillDbServices } from "@/services/server/skillDbServices";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const resolveParams = await params;
    const { id } = resolveParams;

    const newTopic = await skillDbServices.createTopic(id);

    return NextResponse.json(newTopic, { status: 201 });
  } catch (error) {
    // Gracefully catch custom business errors thrown from service layer
    if (error.status) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      );
    }

    console.error("Create Topic Route Error:", error);
    return NextResponse.json(
      { error: "Failed to create topic" },
      { status: 500 }
    );
  }
}
