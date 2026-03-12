import { prisma } from "@/lib/prisma";
import { v4 as uuid } from "uuid";

export async function POST(req) {
   const { email, password } = await req.json();

   // Find user
   const user = await prisma.user.findUnique({ where: { email } });
   if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 401 });
   }

   // TODO: check password
   // if (!bcrypt.compareSync(password, user.password)) ...

   // Generate session
   const sessionId = uuid();

   // Provide expiresAt
   const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 hours

   await prisma.session.create({
      data: {
         id: sessionId,
         userId: user.id,
         expiresAt,
      },
   });

   // Return session id as cookie
   const response = new Response(JSON.stringify({ message: "Logged in" }));
   response.headers.set(
      "Set-Cookie",
      `sessionId=${sessionId}; Path=/; HttpOnly; Max-Age=86400`
   );

   return response;
}