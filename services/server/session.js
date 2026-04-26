import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

/**
 * Internal helper to validate the session from cookies
 */
async function validateSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  if (!sessionId) return null;

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true }
  });

  // Check if session exists and is not expired
  if (!session || session.expiresAt < new Date()) {
    return null;
  }

  return session;
}

/**
 * Returns basic session metadata
 */
export async function getSession() {
  const session = await validateSession();

  if (!session) return null;

  return {
    id: session.id,
    userId: session.userId,
    expiresAt: session.expiresAt
  };
}

/**
 * Returns the full user object associated with the current session
 */
export async function getAuthUser() {
  const session = await validateSession();

  if (!session) return null;

  return session.user ?? null;
}