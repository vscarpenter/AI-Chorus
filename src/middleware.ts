import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Only protect the main app, not API routes or static files
  if (
    request.nextUrl.pathname.startsWith('/api/') ||
    request.nextUrl.pathname.startsWith('/_next/') ||
    request.nextUrl.pathname === '/favicon.ico' ||
    request.nextUrl.pathname === '/login'
  ) {
    return NextResponse.next();
  }

  // Only apply password protection if ACCESS_PASSWORD is configured
  if (!process.env.ACCESS_PASSWORD) {
    return NextResponse.next();
  }

  // Check for authentication cookie
  const authCookie = request.cookies.get('ai-chorus-auth');
  const isAuthenticated = authCookie?.value === process.env.AUTH_SECRET;

  if (!isAuthenticated) {
    // Redirect to login page
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (login page)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
  ],
};