import { authDbServices } from "@/services/server/authDbServices";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // 1. Extract sessionId from the request cookies
    const cookieHeader = req.headers.get("cookie") || "";
    const sessionId = cookieHeader
      .split("; ")
      .find((row) => row.startsWith("sessionId="))
      ?.split("=")[1];

    // 2. Invalidate Session in DB
    if (sessionId) {
      await authDbServices.deleteSession(sessionId);
    }

    // 3. Prepare Response
    const response = NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );

    // 4. Clear the Cookie
    // We set maxAge to 0 to instruct the browser to delete it immediately
    response.cookies.set({
      name: "sessionId",
      value: "",
      path: "/",
      maxAge: 0, 
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error) {
    console.error("Logout Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}