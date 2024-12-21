import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });
  const url = request.nextUrl;

  // If the user is authenticated
  if (token) {
    if (
      url.pathname.startsWith('/sign-in') ||
      url.pathname.startsWith('/sign-up') ||
      url.pathname.startsWith('/verify')
    ) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // If the user is not authenticated
  if (!token) {
    if (url.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }

  // Allow requests to proceed
  return NextResponse.next();
}

// Matcher for middleware
export const config = {
  matcher: [
    '/',
    '/sign-in',
    '/sign-up',
    '/dashboard/:path*',
    '/verify/:path*',
  ],
};
