import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(req, { params }) {
   try {
      const { id } = await params;

      const deletedDefaultTask = await prisma.defaultTask.delete({
         where: { id: id }, // REMOVED parseInt here
      });

      return NextResponse.json({ message: "Deleted successfully", deletedDefaultTask });
   } catch (error) {
      if (error.code === 'P2025') {
         return NextResponse.json({ error: "Record not found" }, { status: 404 });
      }
      return NextResponse.json({ error: "Deletion failed" }, { status: 500 });
   }
}