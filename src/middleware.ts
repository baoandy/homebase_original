import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const protectedPaths = ["/tp", "/login", "/dashboard", "/application"];

  if (
    protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // if (request.nextUrl.pathname.startsWith("/api")) {
  //   const referrer = request.headers.get("referrer");
  //   if (referrer?.startsWith("localhost:3000")) {
  //     return NextResponse.next();
  //   }
  //   if (!referrer || !referrer.startsWith("https://www.yourhomebase.co")) {
  //     return NextResponse.json({ status: 403, message: "Unauthorized" });
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api", "/tp", "/login", "/dashboard", "/application"],
};
