import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
   try {
      const body = await req.json();
      const { title, order, skillId, parentId } = body;

      // 1. Basic Validation
      if (!title) {
         return NextResponse.json(
            { error: "Category title is required" },
            { status: 400 }
         );
      }

      // 2. Logic Check
      if (!skillId && !parentId) {
         return NextResponse.json(
            { error: "Category must be linked to a Skill or a Parent Category" },
            { status: 400 }
         );
      }

      // 3. Create the Category with extended includes
      const newCategory = await prisma.category.create({
         data: {
            title,
            order: order || 0,
            skillId: skillId || null,
            parentId: parentId || null,
         },
         include: {
            // Include the parent skill details if they exist
            skill: true,
            // Include the parent category details if they exist
            parent: true,
            // Keep your existing structures for the UI
            children: true,
            topics: true,
         },
      });

      return NextResponse.json(newCategory);
   } catch (error) {
      console.error("Create Category Error:", error);

      return NextResponse.json(
         { error: "Failed to create category" },
         { status: 500 }
      );
   }
}