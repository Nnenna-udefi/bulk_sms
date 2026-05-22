import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const pathname = request.nextUrl.pathname;
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isAuthRoute = pathname.startsWith("/auth");

  const hasValidToken =
    typeof token === "string" &&
    token.length > 10 &&
    token !== "undefined" &&
    token !== "null";

  if (isDashboardRoute && !hasValidToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // if (isAuthRoute && hasValidToken) {
  //   return NextResponse.redirect(new URL("/dashboard", request.url));
  // }

  return NextResponse.next();
}
