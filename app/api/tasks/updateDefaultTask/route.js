import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req) {
   try {
      const body = await req.json();
      const { id, title, remarks, order } = body;

      if (!id) {
         return NextResponse.json({ error: "Default Task ID is required" }, { status: 400 });
      }

      const updatedDefaultTask = await prisma.defaultTask.update({
         where: { id: parseInt(id) },
         data: {
            ...(title !== undefined && { title }),
            ...(remarks !== undefined && { remarks }),
            ...(order !== undefined && { order: parseInt(order) }),
         },
      });

      return NextResponse.json(updatedDefaultTask);
   } catch (error) {
      console.error("UPDATE_DEFAULT_TASK_ERROR", error);
      return NextResponse.json({ error: "Update failed" }, { status: 500 });
   }
}