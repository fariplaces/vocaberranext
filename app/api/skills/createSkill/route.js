import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
   try {

      const body = await req.json();
      const { title, order } = body;

      // Basic validation
      if (!title) {
         return NextResponse.json(
            { error: "Skill title is required" },
            { status: 400 }
         );
      }

      // Create the new Skill
      const newSkill = await prisma.skill.create({
         data: {
            title,
            order: order, // Default to 0 if no order is provided
         },
         // You can include categories if you want to return the empty structure
         include: {
            categories: true,
         },
      });

      return NextResponse.json(newSkill);
   } catch (error) {
      console.error("Create Skill Error:", error);

      // Handle unique constraint if you have one on the title
      if (error.code === 'P2002') {
         return NextResponse.json(
            { error: "A skill with this title already exists" },
            { status: 400 }
         );
      }

      return NextResponse.json(
         { error: "Failed to create skill" },
         { status: 500 }
      );
   }
}