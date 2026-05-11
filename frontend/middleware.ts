import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const isDashboardRoute = request.nextUrl.pathname.startsWith("/dashboard");
  //   const isAuthPage = request.nextUrl.pathname.startsWith("/auth");

  if (isDashboardRoute && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  //   if (isAuthPage && token) {
  //     return NextResponse.redirect(new URL("/dashboard", request.url));
  //   }

  return NextResponse.next();
}
