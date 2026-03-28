import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
   try {
      const body = await req.json();
      const { userId, title, remarks, order } = body;

      if (!userId || !title) {
         return NextResponse.json({ error: "Title and UserID are required" }, { status: 400 });
      }

      const newDefaultTask = await prisma.defaultTask.create({
         data: {
            userId,
            title,
            remarks,
            order: parseInt(order) || 0,
         },
      });

      return NextResponse.json(newDefaultTask, { status: 201 });
   } catch (error) {
      console.error("CREATE_DEFAULT_TASK_ERROR", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
   }
}