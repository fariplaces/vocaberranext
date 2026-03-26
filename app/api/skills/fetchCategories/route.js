import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
   try {
      const data = await prisma.category.findMany({
         // REMOVED 'where: { parentId: null }' to get EVERYTHING
         orderBy: [
            { skillId: "asc" }, // Group by skill first
            // { order: "asc" }    // Then by your defined order
         ],
         include: {
            // Include the Skill this category belongs to
            skill: true,
            // Include the Parent details (will be null for root categories)
            parent: true,
            // Include topics belonging to this specific category
            topics: {
               orderBy: {
                  order: "asc",
               },
            },
            // Include children if you still want to see the nested structure for each item
            children: {
               orderBy: {
                  order: "asc",
               },
            },
         },
      });

      return NextResponse.json(data);
   } catch (error) {
      console.error("Fetch All Categories Error:", error);
      return NextResponse.json(
         { error: "Failed to fetch categories" },
         { status: 500 }
      );
   }
}