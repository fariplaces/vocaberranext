import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

// PATCH /api/notes/:id/unlink
export async function PATCH(req, { params }) {
   try {
      const session = await getSession();
      if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

      const note = await prisma.note.update({
         where: { id: params.id },
         data: { targetId: null, targetType: null },
      });

      return NextResponse.json(note);
   } catch (err) {
      return NextResponse.json({ message: err.message }, { status: 500 });
   }
}