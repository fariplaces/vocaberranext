// app/api/logout/route.js
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
   const sessionId = req.cookies.get("sessionId")?.value;

   if (sessionId) {
      await prisma.session.delete({ where: { id: sessionId } });
   }

   const response = NextResponse.json({ message: "Logged out" });
   response.cookies.set({
      name: "sessionId",
      value: "",
      path: "/",
      maxAge: 0,
      httpOnly: true,
      sameSite: "lax",
   });

   return response;
}