import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { isAdmin, isOwner } from "@/lib/permissions";

export async function proxy(request: Request) {
  const { pathname } = new URL(request.url);
  const session = await auth();

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const roles = session.user?.roles || [];

  if (pathname.startsWith("/admin") && !isAdmin(roles)) {
    return NextResponse.redirect(new URL("/owner", request.url));
  }

  if (pathname.startsWith("/owner") && !isOwner(roles)) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}