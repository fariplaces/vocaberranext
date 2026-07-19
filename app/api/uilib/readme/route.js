import { uilibDbServices } from "@/services/server/uilibDbServices";
import { NextResponse } from "next/server";

// GET /api/uilib/readme — fetch the shared catalog README
export async function GET() {
  try {
    const doc = await uilibDbServices.getReadme();
    return NextResponse.json(doc);
  } catch (error) {
    console.error("Fetch UI Lib Readme Error:", error);
    return NextResponse.json(
      { message: "Failed to fetch README" },
      { status: 500 }
    );
  }
}

// PATCH /api/uilib/readme — create or update the shared catalog README
export async function PATCH(req) {
  try {
    const { content } = await req.json();
    const doc = await uilibDbServices.upsertReadme(content);
    return NextResponse.json(doc);
  } catch (error) {
    if (error.status) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    console.error("Update UI Lib Readme Error:", error);
    return NextResponse.json(
      { message: "Failed to update README" },
      { status: 500 }
    );
  }
}
