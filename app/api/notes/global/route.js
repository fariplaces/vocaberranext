import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/notes/global — public, no auth required
export async function GET() {
   try {
      const notes = await prisma.note.findMany({
         where: { visibility: "GLOBAL" },
         orderBy: { createdAt: "desc" },
      });

      return NextResponse.json(notes);
   } catch (err) {
      return NextResponse.json({ message: err.message }, { status: 500 });
   }
}