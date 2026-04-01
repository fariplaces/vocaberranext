import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";


// GET /api/notes/templates — global + user's own templates
export async function GET() {
   try {
      const session = await getSession();
      if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

      const templates = await prisma.noteTemplate.findMany({
         where: {
            OR: [{ userId: null }, { userId: session.userId }],
         },
         orderBy: { name: "asc" },
      });

      return NextResponse.json(templates);
   } catch (err) {
      return NextResponse.json({ message: err.message }, { status: 500 });
   }
}

// POST /api/notes/templates — create a user template
export async function POST(req) {
   try {
      const session = await getSession();
      if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

      const { name, pattern, content } = await req.json();

      const template = await prisma.noteTemplate.create({
         data: { name, pattern, content, userId: session.userId },
      });

      return NextResponse.json(template, { status: 201 });
   } catch (err) {
      return NextResponse.json({ message: err.message }, { status: 500 });
   }
}