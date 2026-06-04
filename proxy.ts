import { auth } from "@/auth";


const publicRoutes = [
  "/",
  "/login",
  "/register",
];

export const proxy = auth((req) => {
  const { pathname } = req.nextUrl;

  if (pathname === "/") {
    return;
  }

  if (
    publicRoutes.some((route) =>
      pathname.startsWith(route)
    )
  ) {
    return;
  }

  if (!req.auth) {
    return Response.redirect(
      new URL(
        "/login",
        req.nextUrl.origin
      )
    );
  }

  if (
    req.auth.expiresAt &&
    Date.now() >= req.auth.expiresAt * 1000
  ) {
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