import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(req, { params }) {
   try {
      // 1. Resolve params (Required in newer Next.js versions)
      const resolvedParams = await params;
      const { id } = resolvedParams;

      if (!id) {
         return NextResponse.json({ error: "ID parameter is missing" }, { status: 400 });
      }

      // 2. Delete using the String ID (UUID)
      // We removed parseInt() here because UUIDs are Strings
      const deletedTask = await prisma.task.delete({
         where: { id: id },
      });

      return NextResponse.json({ message: "Task deleted", deletedTask });
   } catch (error) {
      console.error("DELETE_TASK_ERROR:", error);

      // P2025 is the Prisma error for "Record not found"
      if (error.code === 'P2025') {
         return NextResponse.json({ error: "Task not found" }, { status: 404 });
      }
      return NextResponse.json({ error: "Deletion failed" }, { status: 500 });
   }
}