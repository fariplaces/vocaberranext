import { prisma } from "@/lib/prisma";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

export const authDbServices = {
  /**
   * Find a user by email for authentication
   */
  findUserByEmail: async (email) => {
    return await prisma.user.findUnique({
      where: { email },
    });
  },

  /**
   * Create a session and return the ID
   */
  createSession: async (userId) => {
    const sessionId = uuid();
    // Set expiry to 24 hours from now
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);

    await prisma.session.create({
      data: {
        id: sessionId,
        userId: userId,
        expiresAt,
      },
    });

    return { sessionId, expiresAt };
  },

  /**
   * Normalization: Strip sensitive data like passwords
   */
  normalizeUser: (dbUser) => {
    if (!dbUser) return null;
    return {
      id: String(dbUser.id),
      email: dbUser.email,
      name: dbUser.name,
      createdAt: dbUser.createdAt,
      // Ensure NO password key exists here
    };
  },

  /**
   * Delete a session from the database
   */
  deleteSession: async (sessionId) => {
    try {
      await prisma.session.delete({
        where: { id: sessionId },
      });
    } catch (error) {
      // Catch error in case session was already deleted or doesn't exist
      console.error("Session deletion failed or session not found");
    }
  },

  /**
   * Validate a session ID and return the associated user
   */
  getSessionWithUser: async (sessionId) => {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        user: true,
      },
    });

    // Check if session exists and hasn't expired
    if (!session || session.expiresAt < new Date()) {
      return null;
    }

    return session.user;
  },

  /**
   * Check if email is taken and create a new user
   */
  registerUser: async (payload) => {
    const { userName, email, password } = payload;

    // 1. Hash the password (10 rounds of salt)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. Create in DB
    const dbUser = await prisma.user.create({
      data: {
        name: userName,
        email: email,
        password: hashedPassword,
      },
    });

    // 3. Return Normalized (Safe) User
    return {
      id: dbUser.id,
      email: dbUser.email,
      name: dbUser.name,
      createdAt: dbUser.createdAt.toISOString(),
    };
  },
};