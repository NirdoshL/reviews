"use server";

import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  const cookie = request.cookies.get("access");

  const isDashboardRoute = ["/dvls/dashboard"].includes(pathname);
  const isLoginRoute = ["/login"].includes(pathname);

  if (isDashboardRoute) {
    if (cookie?.value) {
      try {
        return NextResponse.next();
      } catch {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
      }
    } else {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
  }
  if (isLoginRoute) {
    if (cookie?.value) {
      try {
        return NextResponse.redirect(
          new URL("/dvls/dashboard", request.nextUrl)
        );
      } catch {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
      }
    } else {
      return NextResponse.next();
    }
  }
}

export const config = {
  matcher: ["/dvls/dashboard", "/login"],
};
