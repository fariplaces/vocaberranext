import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { authDbServices } from "@/services/server/authDbServices";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
// return hashedPassword;
    // 1. Find User via DB Service
    const user = await authDbServices.findUserByEmail(email);

    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    console.log(user.password);
    // 2. Verify Password using Bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // 3. Create Session via DB Service
    const { sessionId } = await authDbServices.createSession(user.id);

    // 4. Normalize response data (remove password/sensitive fields)
    const safeUser = authDbServices.normalizeUser(user);

    const response = NextResponse.json({
      message: "Logged in successfully",
      data: safeUser,
    });

    // 5. Set HttpOnly Cookie for Security
    // HttpOnly prevents XSS attacks from reading the session ID
    const isProduction = process.env.NODE_ENV === "production";
    response.headers.set(
      "Set-Cookie",
      `sessionId=${sessionId}; Path=/; HttpOnly; Max-Age=86400; SameSite=Lax; ${isProduction ? "Secure" : ""}`
    );

    return response;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}