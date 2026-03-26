import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
   try {

      const resolvedParams = await params;
      const { id } = resolvedParams;


      if (!id) {
         return NextResponse.json(
            { error: "Skill ID is required" },
            { status: 400 }
         );
      }

      // Attempt to delete the skill
      const deletedSkill = await prisma.skill.delete({
         where: {
            id: id,
         },
      });

      return NextResponse.json({
         message: "Skill deleted successfully",
         deletedSkill,
      });
   } catch (error) {
      console.error("Delete Skill Error:", error);

      // Prisma Error P2003: Foreign key constraint failed
      // This happens if you have categories linked to this skill and 
      // haven't set up "Cascade Delete" in your schema.prisma
      if (error.code === "P2003") {
         return NextResponse.json(
            {
               error:
                  "Cannot delete skill. Please delete its categories and topics first, or enable Cascade Delete in your schema.",
            },
            { status: 400 }
         );
      }

      // Prisma Error P2025: Record not found
      if (error.code === "P2025") {
         return NextResponse.json(
            { error: "Skill not found" },
            { status: 404 }
         );
      }

      return NextResponse.json(
         { error: "An unexpected error occurred during deletion" },
         { status: 500 }
      );
   }
}