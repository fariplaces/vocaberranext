// middleware.js (Root folder)
import { withAuth } from "./middlewares/withAuth";
import { NextResponse } from "next/server";

/**
 * Higher-Order Function to stack multiple middlewares.
 * It executes them in order, passing the 'next' function to the current one.
 */
function stack(functions = [], index = 0) {
  const current = functions[index];
  
  if (current) {
    const next = stack(functions, index + 1);
    return current(next);
  }

  // Final fallback: proceed with the request
  return () => NextResponse.next();
}

/**
 * MIDDLEWARE ORDER: 
 * Auth check usually comes first to protect the entire application.
 * You can add more here later, e.g., stack([withAuth, withAnalytics, withHeaders])
 */
export default stack([withAuth]);

export const config = {
  // Ensures middleware runs on all routes except static assets and internal Next.js files
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};