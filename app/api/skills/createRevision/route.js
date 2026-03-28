import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
   try {
      const body = await req.json();
      const { topicId, userId, scheduled } = body;

      // 1. Basic Validation
      if (!topicId || !userId) {
         return NextResponse.json(
            { error: "Topic ID and User ID are required" },
            { status: 400 }
         );
      }

      // 2. Create the Revision record
      // We initialize with all 'false' booleans as per your schema defaults
      const newRevision = await prisma.revision.create({
         data: {
            topicId,
            userId,
            scheduled: scheduled ? new Date(scheduled) : new Date(),
            // Booleans (revision1, etc.) default to false via schema
         },
         include: {
            topic: {
               include: {
                  category: {
                     include: {
                        skill: true
                     }
                  }
               }
            }
         }
      });

      return NextResponse.json(newRevision);
   } catch (error) {
      console.error("Create Revision Error:", error);

      // Handle Foreign Key errors (Topic or User doesn't exist)
      if (error.code === 'P2003') {
         return NextResponse.json(
            { error: "Invalid Topic or User ID provided" },
            { status: 400 }
         );
      }

      return NextResponse.json(
         { error: "Failed to initialize revision tracking" },
         { status: 500 }
      );
   }
}