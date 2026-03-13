import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
   const sessionId = req.cookies.get("sessionId")?.value;

   if (!sessionId) {
      return NextResponse.json({ user: null });
   }

   const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { user: true },
   });

   if (!session) {
      return NextResponse.json({ user: null });
   }

   return NextResponse.json({ user: session.user });
}