import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req) {
   try {
      const body = await req.json();

      // 1. Extract ID and the potential fields to update
      const {
         id,
         scheduled,
         practiced,
         revision1, revision1date,
         revision2, revision2date,
         revision3, revision3date,
         revision4, revision4date,
         revision5, revision5date
      } = body;

      // 2. Validation
      if (!id) {
         return NextResponse.json(
            { error: "Revision ID is required" },
            { status: 400 }
         );
      }

      // 3. Perform the Update
      const updatedRevision = await prisma.revision.update({
         where: { id: id },
         data: {
            // Dates: Convert strings to Date objects if provided
            ...(scheduled && { scheduled: new Date(scheduled) }),
            ...(practiced && { practiced: new Date(practiced) }),

            // Revision Status & Dates
            ...(revision1 !== undefined && { revision1 }),
            ...(revision1date && { revision1date: new Date(revision1date) }),

            ...(revision2 !== undefined && { revision2 }),
            ...(revision2date && { revision2date: new Date(revision2date) }),

            ...(revision3 !== undefined && { revision3 }),
            ...(revision3date && { revision3date: new Date(revision3date) }),

            ...(revision4 !== undefined && { revision4 }),
            ...(revision4date && { revision4date: new Date(revision4date) }),

            ...(revision5 !== undefined && { revision5 }),
            ...(revision5date && { revision5date: new Date(revision5date) }),
         },
         include: {
            topic: {
               include: {
                  // 2. Get the Category the topic belongs to
                  category: {
                     include: {
                        // 3. Get the Skill (if this is a root category)
                        skill: true,
                        // 4. Get the Parent Category
                        parent: {
                           include: {
                              // 5. Get the Skill of the Parent Category
                              skill: true,
                           },
                        },
                     },
                  },
               },
            }
         }
      });

      return NextResponse.json(updatedRevision);
   } catch (error) {
      console.error("Update Revision Error:", error);

      if (error.code === "P2025") {
         return NextResponse.json({ error: "Revision record not found" }, { status: 404 });
      }

      return NextResponse.json(
         { error: "Failed to update revision progress" },
         { status: 500 }
      );
   }
}