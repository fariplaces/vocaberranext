import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
   try {
      const resolvedParams = await params;
      const { id } = resolvedParams;

      // 1. Validation
      if (!id) {
         return NextResponse.json(
            { error: "Revision ID is required" },
            { status: 400 }
         );
      }

      // 2. Perform the deletion
      const deletedRevision = await prisma.revision.delete({
         where: {
            id: id,
         },
         // Optional: include the topic title so you can show a 
         // "Stopped tracking 'HTML Tables'" message in your UI
         include: {
            topic: true
         }
      });

      return NextResponse.json({
         message: "Revision tracking removed successfully",
         topicTitle: deletedRevision.topic.title
      });
   } catch (error) {
      console.error("Delete Revision Error:", error);

      // Prisma Error P2025: Record not found
      if (error.code === "P2025") {
         return NextResponse.json(
            { error: "Revision record not found" },
            { status: 404 }
         );
      }

      return NextResponse.json(
         { error: "Failed to delete revision record" },
         { status: 500 }
      );
   }
}