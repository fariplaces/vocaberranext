import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/services/server/session";

// PATCH /api/notes/:id/unpublish — bring a global note back to personal
export async function PATCH(req, { params }) {
  try {
    const session = await getSession();
    if (!session)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const note = await prisma.note.update({
      where: { id: id },
      data: {
        visibility: "PERSONAL",
        userId: session.userId,
        shareCode: null,
      },
    });

    return NextResponse.json(note);
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
