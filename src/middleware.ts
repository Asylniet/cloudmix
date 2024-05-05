import { NextRequest, NextResponse } from "next/server";
import { ratelimiter } from "./lib/rate-limiter";
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export default withAuth(
  async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;
    if (pathname.startsWith("/api/message")) {
      const ip = req.ip ?? "127.0.0.1";

      try {
        const { success } = await ratelimiter.limit(ip);
        if (!success)
          return new NextResponse("Sorry, you are writing too fast");

        return NextResponse.next();
      } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 });
      }
    }

    const isAuth = await getToken({ req });
    const sensitiveRoutes = ["/dashboard"];
    const isAccessingSensitiveRoute = sensitiveRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (pathname.startsWith("/login")) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      return NextResponse.next();
    }

    if (!isAuth && isAccessingSensitiveRoute) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);
