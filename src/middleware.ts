import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });

  console.log("Middleware Token:", token);

  const url = request.nextUrl;

  if (token) {
    if (url.pathname.startsWith("/sign-in") || url.pathname.startsWith("/sign-up") || url.pathname.startsWith("/verify")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}
