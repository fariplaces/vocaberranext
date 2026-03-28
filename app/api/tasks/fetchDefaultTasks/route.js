import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
   try {
      const { searchParams } = new URL(req.url);
      const userId = searchParams.get("userId");

      const where = userId ? { userId } : {};

      const defaultTasks = await prisma.defaultTask.findMany({
         where,
         include: {
            user: { select: { name: true } }
         },
         orderBy: {
            order: "asc",
         },
      });

      // Transform data (Consistent with your formatting pattern)
      const formattedDefaults = defaultTasks.map((dt) => ({
         ...dt,
         isTemplate: true,
         owner: dt.user?.name || "System",
      }));

      return NextResponse.json(formattedDefaults);
   } catch (error) {
      console.error("Fetch Default Tasks Error:", error);
      return NextResponse.json(
         { error: "Failed to fetch master task templates" },
         { status: 500 }
      );
   }
}