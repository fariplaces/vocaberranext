import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req) {
   try {
      const body = await req.json();

      // 1. Extract the ID and the fields we want to update from the body
      const { id, title, order, categoryId } = body;

      // 2. Basic Validation: ID is mandatory to find the record
      if (!id) {
         return NextResponse.json(
            { error: "Topic ID is required in the request body" },
            { status: 400 }
         );
      }

      // 3. Update the Topic
      const updatedTopic = await prisma.topic.update({
         where: {
            id: id,
         },
         data: {
            // Use conditional spread to only update fields provided in the body
            ...(title !== undefined && { title }),
            ...(order !== undefined && { order }),
            ...(categoryId !== undefined && { categoryId }),
         },
         include: {
            // Include the full category/skill tree for the UI to update its state
            category: {
               include: {
                  skill: true,
                  parent: {
                     include: {
                        skill: true
                     }
                  }
               }
            },
            revisions: true
         },
      });

      return NextResponse.json(updatedTopic);
   } catch (error) {
      console.error("Update Topic Error:", error);

      // Prisma Error P2025: Record to update not found
      if (error.code === "P2025") {
         return NextResponse.json(
            { error: "Topic not found" },
            { status: 404 }
         );
      }

      // Prisma Error P2003: Foreign key constraint (if categoryId is invalid)
      if (error.code === "P2003") {
         return NextResponse.json(
            { error: "The provided Category ID is invalid" },
            { status: 400 }
         );
      }

      return NextResponse.json(
         { error: "Failed to update topic" },
         { status: 500 }
      );
   }
}