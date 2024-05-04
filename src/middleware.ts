import { NextRequest, NextResponse } from "next/server";
import { ratelimiter } from "./lib/rate-limiter";

export async function middleware(req: NextRequest) {
  const ip = req.ip ?? "127.0.0.1";

  try {
    const { success } = await ratelimiter.limit(ip);
    if (!success) return new NextResponse("Sorry, you are writing too fast");

    return NextResponse.next();
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export const config = {
  matcher: "/api/message/:path*",
};
