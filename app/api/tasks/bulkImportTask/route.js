import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
   try {
      const body = await req.json();
      // 1. Extract the selected IDs from the body
      const { userId, date, ids } = body;

      if (!userId) {
         return NextResponse.json({ error: "User ID is required" }, { status: 400 });
      }

      // If no specific IDs are provided, we should probably stop here 
      // or return an error to avoid importing everything by accident.
      if (!ids || ids.length === 0) {
         return NextResponse.json({ error: "No tasks selected for import" }, { status: 400 });
      }

      let targetDate = date ? new Date(date) : new Date();
      if (!date) targetDate.setDate(targetDate.getDate() + 1);
      targetDate.setHours(0, 0, 0, 0);

      // 2. FETCH ONLY SELECTED TEMPLATES
      const templates = await prisma.defaultTask.findMany({
         where: {
            userId: userId,
            id: { in: ids } // This filters the database to only your selected UUIDs
         },
         orderBy: { order: 'asc' }
      });

      if (templates.length === 0) {
         return NextResponse.json([], { status: 200 });
      }

      // 3. Map to Task format
      const tasksToCreate = templates.map((tpl) => ({
         userId: tpl.userId,
         title: tpl.title,
         remarks: tpl.remarks || "",
         order: tpl.order || 0,
         date: targetDate,
         status: false,
      }));

      // 4. Bulk Insert
      await prisma.task.createMany({
         data: tasksToCreate,
      });

      // 5. Re-fetch the newly created tasks for Redux
      const newTasks = await prisma.task.findMany({
         where: {
            userId: userId,
            date: targetDate,
            // To be precise, only fetch tasks with titles matching our imported templates
            title: { in: templates.map(t => t.title) }
         },
         orderBy: { order: 'asc' },
      });

      return NextResponse.json(newTasks, { status: 201 });

   } catch (error) {
      console.error("BULK_IMPORT_ERROR:", error);
      return NextResponse.json({ error: "Import failed" }, { status: 500 });
   }
}