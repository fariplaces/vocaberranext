// import { NextResponse } from "next/server";
// import { routes } from "./lib/routes";

// export function middleware(req) {
//    const sessionId = req.cookies.sessionId;
//    const { pathname } = req.nextUrl;

//    const isProtected = (routes.protected || []).some(route =>
//       pathname.startsWith(route)
//    );
//    const isAdmin = (routes.admin || []).some(route =>
//       pathname.startsWith(route)
//    );

//    if (!sessionId && (isProtected || isAdmin)) {
//       return NextResponse.redirect("/auth/login");
//    }

//    if (sessionId && (routes.public || []).includes(pathname)) {
//       return NextResponse.redirect("/dashboard");
//    }

//    return NextResponse.next();
// }

// export const config = { matcher: "/:path*" };



// middleware.js
import { NextResponse } from "next/server";
import { routes } from "@/lib/routes"; // Path to your routes file

export function middleware(req) {
   const sessionId = req.cookies.get("sessionId")?.value; // Next.js 15+ uses .get()
   const { pathname } = req.nextUrl;

   const isProtected = (routes.protected || []).some(route =>
      pathname.startsWith(route)
   );
   const isAdmin = (routes.admin || []).some(route =>
      pathname.startsWith(route)
   );

   // 1. If trying to access protected/admin without a session
   if (!sessionId && (isProtected || isAdmin)) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
   }

   // 2. 🔥 THE FIX: Only redirect logged-in users away from AUTH pages, not the landing page!
   const authPages = ["/auth/login", "/auth/register"];
   if (sessionId && authPages.includes(pathname)) {
      return NextResponse.redirect(new URL("/", req.url));
   }

   return NextResponse.next();
}

export const config = {
   // We ignore Next.js internals and static files to prevent middleware lag
   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};