import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

// GET /api/notes/:id
export async function GET(req, { params }) {
   try {
      const session = await getSession();
      if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

      const resolvedParams = await params;
      const { id } = resolvedParams;

      const note = await prisma.note.findFirst({
         where: { id: id, userId: session.userId },
      });

      if (!note) return NextResponse.json({ message: "Not found" }, { status: 404 });

      return NextResponse.json(note);
   } catch (err) {
      return NextResponse.json({ message: err.message }, { status: 500 });
   }
}

// PATCH /api/notes/:id — update title or content
export async function PATCH(req, { params }) {
   try {
      const session = await getSession();
      if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

      const { title, content } = await req.json();

      const resolvedParams = await params;
      const { id } = resolvedParams;

      const note = await prisma.note.update({
         where: { id: id },
         data: { title, content },
      });

      return NextResponse.json(note);
   } catch (err) {
      return NextResponse.json({ message: err.message }, { status: 500 });
   }
}

// DELETE /api/notes/:id
export async function DELETE(req, { params }) {
   try {
      const session = await getSession();
      if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

      const resolvedParams = await params;
      const { id } = resolvedParams;

      await prisma.note.delete({ where: { id: id } });

      return NextResponse.json({ message: "Deleted" });
   } catch (err) {
      return NextResponse.json({ message: err.message }, { status: 500 });
   }
}