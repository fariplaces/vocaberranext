// lib/session.js
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function getSession() {
   // 1. Grab the session ID from cookies
   const cookieStore = await cookies();
   const sessionId = cookieStore.get("sessionId")?.value;

   if (!sessionId) return null;

   // 2. Look it up in your database
   const session = await prisma.session.findUnique({
      where: { id: sessionId },
   });

   // 3. Return null if not found or expired
   if (!session) return null;
   if (session.expiresAt < new Date()) return null;

   // 4. 🔥 Match your API's expected shape (session.userId)
   return {
      id: session.id,
      userId: session.userId,
      expiresAt: session.expiresAt
   };
}