import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

// GET /api/notes — all personal notes for logged in user
export async function GET(req) {
   try {
      const session = await getSession();
      if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

      const notes = await prisma.note.findMany({
         where: { userId: session.userId, visibility: "PERSONAL" },
         orderBy: { updatedAt: "desc" },
      });

      return NextResponse.json(notes);
   } catch (err) {
      return NextResponse.json({ message: err.message }, { status: 500 });
   }
}

// POST /api/notes — create a new note
export async function POST(req) {
   try {
      const session = await getSession();
      if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

      const { title, content, targetId, targetType } = await req.json();

      const note = await prisma.note.create({
         data: {
            title: title || "Untitled",
            content,
            targetId: targetId || null,
            targetType: targetType || null,
            visibility: "PERSONAL",
            userId: session.userId,
         },
      });

      return NextResponse.json(note, { status: 201 });
   } catch (err) {
      return NextResponse.json({ message: err.message }, { status: 500 });
   }
}