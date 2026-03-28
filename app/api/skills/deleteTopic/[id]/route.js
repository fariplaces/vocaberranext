import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
   try {
      const resolvedParams = await params;
      const { id } = resolvedParams;

      // 1. Validation: Ensure the ID exists in the URL
      if (!id) {
         return NextResponse.json(
            { error: "Topic ID is required" },
            { status: 400 }
         );
      }

      // 2. Delete the Topic
      // Note: If you have Revisions, ensure your schema has 'onDelete: Cascade'
      // or delete them manually before this step.
      const deletedTopic = await prisma.topic.delete({
         where: {
            id: id,
         },
      });

      return NextResponse.json({
         message: "Topic deleted successfully",
         deletedTopic,
      });
   } catch (error) {
      console.error("Delete Topic Error:", error);

      // Prisma Error P2025: Record to delete does not exist
      if (error.code === "P2025") {
         return NextResponse.json(
            { error: "Topic not found" },
            { status: 404 }
         );
      }

      // Prisma Error P2003: Foreign key constraint (e.g., if Revision exists)
      if (error.code === "P2003") {
         return NextResponse.json(
            {
               error: "Cannot delete topic. Please delete its revisions first.",
            },
            { status: 400 }
         );
      }

      return NextResponse.json(
         { error: "An unexpected error occurred during deletion" },
         { status: 500 }
      );
   }
}