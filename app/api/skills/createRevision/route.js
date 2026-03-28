import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
   try {
      const body = await req.json();
      const { topicId, userId, scheduled, practiced, revision1, revision1date, revision2, revision2date, revision3, revision3date, revision4, revision4date, revision5, revision5date } = body;

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
            practiced: practiced ? new Date(practiced) : null,
            revision1date: revision1date ? new Date(revision1date) : new Date(),
            revision2date: revision2date ? new Date(revision2date) : new Date(),
            revision3date: revision3date ? new Date(revision3date) : new Date(),
            revision4date: revision4date ? new Date(revision4date) : new Date(),
            revision5date: revision5date ? new Date(revision5date) : new Date(),
            revision1: revision1 || false,
            revision2: revision2 || false,
            revision3: revision3 || false,
            revision4: revision4 || false,
            revision5: revision5 || false,
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