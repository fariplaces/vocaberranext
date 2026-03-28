import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
   try {
      const body = await req.json();
      const { userId, date } = body;

      if (!userId) {
         return NextResponse.json({ error: "User ID is required" }, { status: 400 });
      }

      // --- Date Logic ---
      // If date is missing, null, or empty string, use Today + 1
      let targetDate;
      if (date && date !== "" && date !== null) {
         targetDate = new Date(date);
      } else {
         targetDate = new Date();
         targetDate.setDate(targetDate.getDate() + 1);
      }

      // 1. Fetch the templates (DefaultTasks)
      const templates = await prisma.defaultTask.findMany({
         where: { userId: userId },
         orderBy: { order: 'asc' }
      });

      if (templates.length === 0) {
         return NextResponse.json([], { status: 200 }); // Return empty array to match Redux
      }

      // 2. Map templates to Task format
      const tasksToCreate = templates.map((tpl) => ({
         userId: tpl.userId,
         title: tpl.title,
         remarks: tpl.remarks,
         order: tpl.order,
         date: targetDate,
         status: false,
      }));

      // 3. Create many tasks in one transaction
      await prisma.task.createMany({
         data: tasksToCreate,
         skipDuplicates: true,
      });

      // 4. Fetch the full Task objects (with IDs) to return to Redux
      // createMany doesn't return the full objects, so we re-fetch them
      const newTasks = await prisma.task.findMany({
         where: {
            userId: userId,
            date: targetDate,
         },
         orderBy: { order: 'asc' },
      });

      return NextResponse.json(newTasks, { status: 201 });

   } catch (error) {
      console.error("BULK_IMPORT_ERROR:", error);
      return NextResponse.json(
         { error: "Failed to import tasks from templates" },
         { status: 500 }
      );
   }
}