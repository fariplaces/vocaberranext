import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
   try {
      const data = await prisma.revision.findMany({
         orderBy: {
            scheduled: "asc", // Show soonest revisions first
         },
         include: {
            // 1. Get the Topic
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
            },
         },
      });

      // Optional: Transform the data so the frontend has a flat "breadcrumb" string
      const formattedData = data.map((rev) => {
         const topic = rev.topic;
         const cat = topic.category;
         const parent = cat.parent;

         // Logic: If there's a parent, use its skill. Otherwise, use the category's skill.
         const activeSkill = parent ? parent.skill : cat.skill;

         return {
            ...rev,
            breadcrumb: {
               skill: activeSkill?.title || "No Skill",
               parent: parent?.title || null,
               category: cat.title,
               topic: topic.title,
            },
         };
      });

      return NextResponse.json(formattedData);
   } catch (error) {
      console.error("Fetch Revisions Error:", error);
      return NextResponse.json(
         { error: "Failed to fetch revisions with hierarchy" },
         { status: 500 }
      );
   }
}