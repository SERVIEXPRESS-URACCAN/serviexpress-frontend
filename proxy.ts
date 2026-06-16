import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { getRedirectByRole } from "./lib/redirect-by-role";
import { Role } from "./constants/roles";

const publicRoutes = ["/login"];

export const proxy = auth((req) => {
  const { pathname } = req.nextUrl;

  if (req.nextUrl.searchParams.has("_rsc")) {
    return;
  }

  const isPublic = publicRoutes.includes(pathname);

  // Ya autenticado intentando entrar al login
  if (pathname === "/login" && req.auth) {
    const roles = req.auth.user?.roles as Role[];

    return NextResponse.redirect(
      new URL(
        getRedirectByRole(roles),
        req.nextUrl.origin
      )
    );
  }

  // Rutas públicas
  if (isPublic) {
    return;
  }

  // Rutas protegidas
  if (!req.auth) {
    return NextResponse.redirect(
      new URL("/login", req.nextUrl.origin)
    );
  }
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};