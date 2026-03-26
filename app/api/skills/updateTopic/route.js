import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req) {
   try {
      const body = await req.json();

      // Now we extract the ID from the body along with other data
      const { id, title, order, parentId, skillId } = body;

      if (!id) {
         return NextResponse.json(
            { error: "Category ID is required in the request body" },
            { status: 400 }
         );
      }

      const updatedCategory = await prisma.category.update({
         where: {
            id: id,
         },
         data: {
            ...(title !== undefined && { title }),
            ...(order !== undefined && { order }),
            ...(parentId !== undefined && { parentId }),
            ...(skillId !== undefined && { skillId }),
         },
         include: {
            skill: true,
            parent: true,
            children: true,
            topics: true,
         },
      });

      return NextResponse.json(updatedCategory);
   } catch (error) {
      console.error("Update Category Error:", error);

      if (error.code === 'P2025') {
         return NextResponse.json({ error: "Category not found" }, { status: 404 });
      }

      return NextResponse.json(
         { error: "Failed to update category" },
         { status: 500 }
      );
   }
}