import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
   try {
      const data = await prisma.topic.findMany({
         orderBy: {
            order: "asc",
         },
         include: {
            category: {
               include: {
                  // 1. Get the direct skill of the category (if it's a root category)
                  skill: true,
                  // 2. Get the parent category
                  parent: {
                     include: {
                        // 3. Get the skill of the parent category
                        skill: true,
                     },
                  },
               },
            },
            revisions: {
               orderBy: { date: "asc" }
            }
         },
      });

      // Optional: Transform the data to match your "if-else" requirement 
      // so the frontend doesn't have to do the logic.
      const transformedData = data.map((topic) => {
         const directCategory = topic.category;
         const parentCategory = directCategory.parent;

         // Logic: Parent's skill takes priority, otherwise use the direct category's skill
         const effectiveSkill = parentCategory?.skill || directCategory.skill;

         return {
            ...topic,
            effectiveSkill, // This is the skill you're looking for
            parentCategory: parentCategory || null,
         };
      });

      return NextResponse.json(transformedData);
   } catch (error) {
      console.error("Fetch Topics Error:", error);
      return NextResponse.json(
         { error: "Failed to fetch topics" },
         { status: 500 }
      );
   }
}