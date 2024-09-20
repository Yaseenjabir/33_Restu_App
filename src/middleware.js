import { NextResponse } from "next/server";

export function middleware(request) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
