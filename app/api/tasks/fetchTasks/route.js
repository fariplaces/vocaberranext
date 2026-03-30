import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
   try {
      const { searchParams } = new URL(req.url);
      const userId = searchParams.get("userId");

      // Filter by userId if provided in query params
      const where = userId ? { userId } : {};

      const tasks = await prisma.task.findMany({
         where,
         include: {
            user: {
               select: { name: true, email: true }
            }
         },
         orderBy: [
            { date: "desc" }, // Primary: Show most recent dates first
            { order: "asc" }   // Secondary: Sort by your custom order
         ],
      });

      // Transform data (Pattern matching your Revision API)
      const formattedTasks = tasks.map((task) => {
         return {
            ...task,
            displayDate: task.date
               ? new Date(task.date).toLocaleDateString("en-GB", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  timeZone: "UTC", // 👈 important
               })
               : "No Date",
            userName: task.user?.name || "Unknown User",
         };
      });

      return NextResponse.json(formattedTasks);
   } catch (error) {
      console.error("Fetch Tasks Error:", error);
      return NextResponse.json(
         { error: "Failed to fetch tasks with user context" },
         { status: 500 }
      );
   }
}