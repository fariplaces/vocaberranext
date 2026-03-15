import { prisma } from "@/lib/prisma";
import { v4 as uuid } from "uuid";

export async function POST(req) {
   const { email, password } = await req.json();

   // Find user
   const user = await prisma.user.findUnique({
      where: { email },
   });

   if (!user) {
      return new Response(
         JSON.stringify({ message: "User not found" }),
         { status: 401 }
      );
   }

   // TODO: check password with bcrypt

   const sessionId = uuid();
   const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);

   await prisma.session.create({
      data: {
         id: sessionId,
         userId: user.id,
         expiresAt,
      },
   });

   // Remove sensitive data
   const safeUser = {
      id: user.id,
      email: user.email,
      name: user.name,
   };

   const response = new Response(
      JSON.stringify({
         message: "Logged in",
         user: safeUser
      })
   );

   response.headers.set(
      "Set-Cookie",
      `sessionId=${sessionId}; Path=/; HttpOnly; Max-Age=86400`
   );

   return response;
}