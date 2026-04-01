import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

// PATCH /api/notes/:id/link
export async function PATCH(req, { params }) {
   try {
      const session = await getSession();
      if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

      const resolvedParams = await params;
      const { id } = resolvedParams;

      const { targetId, targetType } = await req.json();

      const note = await prisma.note.update({
         where: { id: id },
         data: { targetId, targetType },
      });

      return NextResponse.json(note);
   } catch (err) {
      return NextResponse.json({ message: err.message }, { status: 500 });
   }
}