import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

// POST /api/notes/import
export async function POST(req) {
   try {
      const session = await getSession();
      if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

      const { shareCode, targetId, targetType } = await req.json();

      const original = await prisma.note.findUnique({ where: { shareCode } });
      if (!original)
         return NextResponse.json({ message: "Note not found with this share code" }, { status: 404 });

      const imported = await prisma.note.create({
         data: {
            title: original.title,
            content: original.content,
            visibility: "PERSONAL",
            userId: session.userId,
            targetId: targetId || null,
            targetType: targetType || null,
            shareCode: null,
         },
      });

      return NextResponse.json(imported, { status: 201 });
   } catch (err) {
      return NextResponse.json({ message: err.message }, { status: 500 });
   }
}