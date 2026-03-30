import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto"; // 👈 1. Import this to generate fresh IDs

export async function POST(req) {
   try {
      const body = await req.json();
      const { userId, date, ids } = body;

      if (!userId) {
         return NextResponse.json({ error: "User ID is required" }, { status: 400 });
      }

      if (!ids || ids.length === 0) {
         return NextResponse.json({ error: "No tasks selected for import" }, { status: 400 });
      }

      let targetDate;

      // ... (Keep your existing date processing exactly as it is) ...
      if (date instanceof Date) {
         targetDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
      } else if (typeof date === "number") {
         const now = new Date();
         targetDate = new Date(Date.UTC(now.getFullYear(), now.getMonth(), date));
      } else if (date) {
         const parsed = new Date(date);
         targetDate = new Date(Date.UTC(parsed.getFullYear(), parsed.getMonth(), parsed.getDate()));
      } else {
         const now = new Date();
         targetDate = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate() + 1));
      }

      if (isNaN(targetDate.getTime())) {
         throw new Error("Invalid date before DB insert");
      }

      // 2. FETCH ONLY SELECTED TEMPLATES
      const templates = await prisma.defaultTask.findMany({
         where: {
            userId: userId,
            id: { in: ids }
         },
         orderBy: { order: 'asc' }
      });

      if (templates.length === 0) {
         return NextResponse.json([], { status: 200 });
      }

      // 3. Map to Task format & generate NEW IDs manually ✨
      const tasksToCreate = templates.map((tpl) => ({
         id: randomUUID(), // 👈 2. Force a completely new unique ID here!
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
      // Fetching by specific array of IDs we just generated is faster and highly accurate
      const newTasks = await prisma.task.findMany({
         where: {
            id: { in: tasksToCreate.map(t => t.id) } // 👈 3. Target the exact new IDs
         },
         orderBy: { order: 'asc' },
      });

      return NextResponse.json(newTasks, { status: 201 });

   } catch (error) {
      console.error("BULK_IMPORT_ERROR:", error);
      return NextResponse.json({ error: "Import failed" }, { status: 500 });
   }
}