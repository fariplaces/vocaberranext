import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

// GET /api/notes/target?targetId=xxx&targetType=TOPIC
export async function GET(req) {
   try {
      const session = await getSession();
      if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

      const { searchParams } = new URL(req.url);
      const targetId = searchParams.get("targetId");
      const targetType = searchParams.get("targetType");

      if (!targetId || !targetType)
         return NextResponse.json({ message: "targetId and targetType required" }, { status: 400 });

      const notes = await prisma.note.findMany({
         where: { userId: session.userId, targetId, targetType },
         orderBy: { updatedAt: "desc" },
      });

      return NextResponse.json(notes);
   } catch (err) {
      return NextResponse.json({ message: err.message }, { status: 500 });
   }
}