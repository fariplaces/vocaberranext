import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req) {
   try {
      const body = await req.json();
      const { id, ...updateData } = body; // Extract ID from body

      if (!id) {
         return NextResponse.json({ error: "Task ID is required in body" }, { status: 400 });
      }

      const updatedTask = await prisma.task.update({
         where: { id: id }, // UUID String
         data: {
            ...(updateData.title !== undefined && { title: updateData.title }),
            ...(updateData.status !== undefined && { status: updateData.status }),
            ...(updateData.remarks !== undefined && { remarks: updateData.remarks }),
            ...(updateData.order !== undefined && { order: parseInt(updateData.order) }),
         },
      });

      return NextResponse.json(updatedTask);
   } catch (error) {
      console.error("UPDATE_TASK_ERROR:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
   }
}