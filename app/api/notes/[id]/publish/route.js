import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

const generateShareCode = () => {
   const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
   const random = Array.from({ length: 6 }, () =>
      chars[Math.floor(Math.random() * chars.length)]
   ).join("");
   return `NOTE-${random}`;
};

// PATCH /api/notes/:id/publish — make a note global
export async function PATCH(req, { params }) {
   try {
      const session = await getSession();
      if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

      const resolvedParams = await params;
      const { id } = resolvedParams;

      // keep trying until shareCode is unique
      let shareCode;
      let attempts = 0;
      while (true) {
         shareCode = generateShareCode();
         const existing = await prisma.note.findUnique({ where: { shareCode } });
         if (!existing) break;
         if (++attempts > 10) throw new Error("Could not generate unique share code");
      }

      const note = await prisma.note.update({
         where: { id: id },
         data: {
            visibility: "GLOBAL",
            userId: null,
            shareCode,
         },
      });

      return NextResponse.json(note);
   } catch (err) {
      return NextResponse.json({ message: err.message }, { status: 500 });
   }
}