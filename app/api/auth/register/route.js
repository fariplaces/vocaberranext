import { NextResponse } from "next/server";
import { authDbService } from "@/services/server/authDbService";

export async function POST(req) {
  try {
    const body = await req.json();

    // 1. Check for existing user first to prevent duplicate accounts
    const existingUser = await authDbService.findUserByEmail(body.email);
    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 400 }
      );
    }

    // 2. Register via Service (Handles hashing and DB creation)
    const safeUser = await authDbService.registerUser(body);

    // 3. Success Response
    return NextResponse.json({
      message: "User registered successfully",
      data: safeUser,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { message: "Registration failed. Please try again later." },
      { status: 500 }
    );
  }
}