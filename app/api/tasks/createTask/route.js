import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
   try {
      const body = await req.json();
      const { userId, title, remarks, date, order } = body;

      // Validation
      if (!userId || !title || !date) {
         return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }

      const newTask = await prisma.task.create({
         data: {
            userId,
            title,
            remarks,
            date: new Date(date),
            order: parseInt(order) || 0,
            status: false,
         },
      });

      return NextResponse.json(newTask, { status: 201 });
   } catch (error) {
      console.error("CREATE_TASK_ERROR", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
   }
}