import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function getAuthUser() {

   const sessionId = cookies().get("sessionId")?.value;

   if (!sessionId) return null;

   const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { user: true }
   });

   if (!session) return null;

   if (session.expiresAt < new Date()) return null;

   return session.user;
}

