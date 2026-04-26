// middlewares/withAuth.js
import { NextResponse } from "next/server";
import { 
  PUBLIC_ROUTES, 
  AUTH_ROUTES, 
  ADMIN_ROUTES, 
  PROTECTED_ROUTES 
} from "@/config/routesConfig";

/**
 * Middleware wrapper to handle authentication and route protection
 */
export const withAuth = (next) => {
  return async (request) => {
    const sessionId = request.cookies.get("sessionId")?.value;
    const { pathname } = request.nextUrl;

    const isPublic = PUBLIC_ROUTES.some(route => pathname.startsWith(route));
    const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route));
    const isAdminRoute = ADMIN_ROUTES.some(route => pathname.startsWith(route));
    const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));

    // 1. Logged in users trying to access Login/Register -> Redirect Home
    if (isAuthRoute && sessionId) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // 2. Unauthenticated users trying to access Protected OR Admin routes -> Redirect Login
    if (!sessionId && (isProtectedRoute || isAdminRoute)) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // 3. Fallback: Let the request proceed
    return next(request);
  };
};