import { NextResponse } from "next/server";
import { skillDbServices } from "@/services/server/skillDbServices";

export async function POST(request) {
  try {
    const body = await request.json();

    console.log("Received request body for category creation:", body);

    // Fire the creation block through the service layer
    const newCategory = await skillDbServices.createCategory(body);

    return NextResponse.json(newCategory); // 201 Created
  } catch (error) {
    // If it's a validation error we threw manually from our service layer
    if (error.status) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }

    console.error("Create Category Route Error:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 },
    );
  }
}
