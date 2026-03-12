import { NextResponse } from "next/server";
import { routes } from "./lib/routes";

export function middleware(req) {
   const sessionId = req.cookies.sessionId;
   const { pathname } = req.nextUrl;

   const isProtected = (routes.protected || []).some(route =>
      pathname.startsWith(route)
   );
   const isAdmin = (routes.admin || []).some(route =>
      pathname.startsWith(route)
   );

   if (!sessionId && (isProtected || isAdmin)) {
      return NextResponse.redirect("/login");
   }

   if (sessionId && (routes.public || []).includes(pathname)) {
      return NextResponse.redirect("/dashboard");
   }

   return NextResponse.next();
}

export const config = { matcher: "/:path*" };