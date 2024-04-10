import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // const sessionCookie = request.cookies.get("next-auth.session-token");
  // if (sessionCookie) {
  //   return NextResponse.next();
  // }

  if (request.nextUrl.pathname.startsWith("/api")) {
    const referrer = request.headers.get("referrer");
    if (referrer?.startsWith("localhost:3000")) {
      return NextResponse.next();
    }
    if (!referrer || !referrer.startsWith("https://www.yourhomebase.co")) {
      return NextResponse.json({ status: 403, message: "Unauthorized" });
    }
  }
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    // "/dashboard",
    "/api",
    // "/admin",
    // "/login",
    // "/register",
    // "/service",
  ],
};
