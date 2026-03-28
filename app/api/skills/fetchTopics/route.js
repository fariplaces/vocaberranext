import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
   try {
      const data = await prisma.topic.findMany({
         include: {
            category: {
               include: {
                  skill: true,
                  parent: {
                     include: { skill: true }
                  }
               }
            }
         }
      });

      const results = data.map(topic => {
         // 1. Identify the category
         const cat = topic.category;

         // 2. Conditional Logic: 
         // If cat.parent exists, take its skill. Otherwise, take cat.skill.
         const associatedSkill = cat.parent ? cat.parent.skill : cat.skill;

         return {
            ...topic,
            displayCategory: cat.title,
            displayParent: cat.parent?.title || "Root",
            displaySkill: associatedSkill?.title || "No Skill Assigned"
         };
      });

      return NextResponse.json(results);
   } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
   }
}