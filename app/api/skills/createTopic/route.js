import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
   try {
      const body = await req.json();
      const { title, order, categoryId } = body;

      // 1. Basic Validation
      if (!title) {
         return NextResponse.json(
            { error: "Topic title is required" },
            { status: 400 }
         );
      }

      // 2. Logic Check: Topic must be linked to a Category
      if (!categoryId) {
         return NextResponse.json(
            { error: "Topic must be linked to a Category" },
            { status: 400 }
         );
      }

      // 3. Create the Topic with extended includes
      const newTopic = await prisma.topic.create({
         data: {
            title,
            order: order || 0,
            categoryId: categoryId,
         },
         include: {
            // Include the category, its parent, and the skills
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
            revisions: true // Include revisions (likely empty for a new topic)
         },
      });

      return NextResponse.json(newTopic);
   } catch (error) {
      console.error("Create Topic Error:", error);

      // Handle case where categoryId might be invalid
      if (error.code === 'P2003') {
         return NextResponse.json(
            { error: "The provided Category ID does not exist" },
            { status: 400 }
         );
      }

      return NextResponse.json(
         { error: "Failed to create topic" },
         { status: 500 }
      );
   }
}