import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
   try {
      const data = await prisma.skill.findMany({
         orderBy: {
            order: "asc",
         },
         include: {
            categories: {
               // Filter to only get Root Categories for this skill
               where: {
                  parentId: null,
               },
               orderBy: {
                  order: "asc",
               },
               // include: {
               //    // Include sub-categories (children) nested inside the parent
               //    children: {
               //       orderBy: {
               //          order: "asc",
               //       },
               //    },
               //    // Include topics that belong directly to the parent category
               //    topics: {
               //       orderBy: {
               //          order: "asc",
               //       },
               //    },
               // },
            },
         },
      });

      return NextResponse.json(data);
   } catch (error) {
      console.error("Fetch Error:", error);
      return NextResponse.json(
         { error: "Failed to fetch top-level categories" },
         { status: 500 }
      );
   }
}