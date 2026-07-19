import { uilibDbServices } from "@/services/server/uilibDbServices";
import { NextResponse } from "next/server";

// GET /api/uilib/components — list all specimens
export async function GET() {
  try {
    const components = await uilibDbServices.getComponents();
    return NextResponse.json(components);
  } catch (error) {
    console.error("Fetch UI Lib Components Error:", error);
    return NextResponse.json(
      { message: "Failed to fetch specimens" },
      { status: 500 }
    );
  }
}

// POST /api/uilib/components — create a new specimen
export async function POST(req) {
  try {
    const body = await req.json();
    const created = await uilibDbServices.createComponent(body);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    if (error.status) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    console.error("Create UI Lib Component Error:", error);
    return NextResponse.json(
      { message: "Failed to create specimen" },
      { status: 500 }
    );
  }
}
