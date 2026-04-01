import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

// PATCH /api/notes/templates/:id
export async function PATCH(req, { params }) {
   try {
      const session = await getSession();
      if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

      const { name, pattern, content } = await req.json();

      const template = await prisma.noteTemplate.update({
         where: { id: params.id },
         data: { name, pattern, content },
      });

      return NextResponse.json(template);
   } catch (err) {
      return NextResponse.json({ message: err.message }, { status: 500 });
   }
}

// DELETE /api/notes/templates/:id
export async function DELETE(req, { params }) {
   try {
      const session = await getSession();
      if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

      // prevent deleting global templates
      const template = await prisma.noteTemplate.findUnique({
         where: { id: params.id },
      });

      if (!template) return NextResponse.json({ message: "Not found" }, { status: 404 });
      if (template.userId === null)
         return NextResponse.json({ message: "Cannot delete global templates" }, { status: 403 });

      await prisma.noteTemplate.delete({ where: { id: params.id } });

      return NextResponse.json({ message: "Deleted" });
   } catch (err) {
      return NextResponse.json({ message: err.message }, { status: 500 });
   }
}