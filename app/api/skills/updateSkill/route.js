import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req) {
   try {
      const body = await req.json();

      // Extract ID from the body along with the update data
      const { id, title, order } = body;
      // 1. Validation: We MUST have an ID to know which skill to update
      if (!id) {
         return NextResponse.json(
            { error: "Skill ID is required in the request body" },
            { status: 400 }
         );
      }

      // 2. Perform the update
      const updatedSkill = await prisma.skill.update({
         where: {
            id: id,
         },
         data: {
            // Only update fields if they are explicitly provided in the body
            ...(title !== undefined && { title }),
            ...(order !== undefined && { order }),
         },
      });

      return NextResponse.json(updatedSkill);
   } catch (error) {
      console.error("Update Skill Error:", error);

      // Prisma Error P2025: Record to update not found
      if (error.code === "P2025") {
         return NextResponse.json(
            { error: "Skill not found" },
            { status: 404 }
         );
      }

      return NextResponse.json(
         { error: "Failed to update skill" },
         { status: 500 }
      );
   }
}