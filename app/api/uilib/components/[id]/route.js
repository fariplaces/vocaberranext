import { uilibDbServices } from "@/services/server/uilibDbServices";
import { NextResponse } from "next/server";

// PATCH /api/uilib/components/:id — update a specimen
export async function PATCH(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const updated = await uilibDbServices.updateComponent(id, body);
    return NextResponse.json(updated);
  } catch (error) {
    if (error.status) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    console.error("Update UI Lib Component Error:", error);
    return NextResponse.json(
      { message: "Failed to update specimen" },
      { status: 500 }
    );
  }
}

// DELETE /api/uilib/components/:id — delete a specimen
export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    const deleted = await uilibDbServices.deleteComponent(id);
    return NextResponse.json(deleted);
  } catch (error) {
    if (error.status) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    console.error("Delete UI Lib Component Error:", error);
    return NextResponse.json(
      { message: "Failed to delete specimen" },
      { status: 500 }
    );
  }
}
