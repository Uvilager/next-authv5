import { auth } from "@/auth";

export default auth((req) => {
  if (
    (req.auth && req.nextUrl.pathname.startsWith("/login")) ||
    req.nextUrl.pathname.startsWith("/register")
  ) {
    return Response.redirect(new URL("/user", req.url));
  }
  if (!req.auth && req.nextUrl.pathname.startsWith("/user")) {
    return Response.redirect(new URL("/login", req.url));
  }
  return;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
