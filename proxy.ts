import { auth } from "@/auth";

const publicRoutes = [
  "/",
  "/login",
  "/register",
];

export const proxy = auth((req) => {
  const { pathname } = req.nextUrl;

  // Home pública
  if (pathname === "/") {
    return;
  }

  // Rutas públicas
  if (
    publicRoutes.some((route) =>
      pathname.startsWith(route)
    )
  ) {
    return;
  }

  // No autenticado
  if (!req.auth) {
    return Response.redirect(
      new URL(
        "/login",
        req.nextUrl.origin
      )
    );
  }
});

export const config = {
  matcher: [
    String.raw`/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)`,
  ],
};