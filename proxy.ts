import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";
import { isAdmin, isOwner } from "@/lib/permissions";

const publicRoutes = ["/login", "/register", "/unauthorized"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const session = await auth();

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const roles = session.user?.roles || [];

  if (pathname.startsWith("/admin") && !isAdmin(roles)) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  if (pathname.startsWith("/owner") && !isOwner(roles)) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/auth/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};