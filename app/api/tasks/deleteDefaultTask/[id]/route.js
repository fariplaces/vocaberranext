import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(req, { params }) {
   try {
      const resolvedParams = await params;
      const { id } = resolvedParams;

      const deletedDefaultTask = await prisma.defaultTask.delete({
         where: { id: parseInt(id) },
      });

      return NextResponse.json({ message: "Default Task deleted", deletedDefaultTask });
   } catch (error) {
      if (error.code === 'P2025') {
         return NextResponse.json({ error: "Template not found" }, { status: 404 });
      }
      return NextResponse.json({ error: "Deletion failed" }, { status: 500 });
   }
}