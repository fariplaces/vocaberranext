import { NextResponse } from "next/server";
import { getAuthUser } from "@/services/server/session";
import { authDbServices } from "@/services/server/authDbServices";

export async function GET() {
  try {
    // 1. Use the helper to check the sessionId cookie against the DB
    const user = await getAuthUser();

    // 2. Strip sensitive fields (password, etc.) before sending to the client
    const safeUser = authDbServices.normalizeUser(user);

    // 3. Return the user data
    // If safeUser is null, your Redux 'checkAuth' thunk will handle the logout flow
    return NextResponse.json({ data: safeUser });
  } catch (error) {
    console.error("Session Check Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", user: null },
      { status: 500 }
    );
  }
}