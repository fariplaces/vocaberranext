import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
   try {
      const resolvedParams = await params;
      const { id } = resolvedParams;


      if (!id) {
         return NextResponse.json(
            { error: "Category ID is required" },
            { status: 400 }
         );
      }

      // Attempt to delete the category
      const deletedCategory = await prisma.category.delete({
         where: {
            id: id,
         },
      });

      return NextResponse.json({
         message: "Category deleted successfully",
         deletedCategory,
      });
   } catch (error) {
      console.error("Delete Category Error:", error);

      // Prisma Error P2003: Foreign key constraint failed (has children or topics)
      if (error.code === "P2003") {
         return NextResponse.json(
            {
               error:
                  "Cannot delete category. Please delete all sub-categories and topics first.",
            },
            { status: 400 }
         );
      }

      // Prisma Error P2025: Record to delete does not exist
      if (error.code === "P2025") {
         return NextResponse.json(
            { error: "Category not found" },
            { status: 404 }
         );
      }

      return NextResponse.json(
         { error: "An unexpected error occurred during deletion" },
         { status: 500 }
      );
   }
}