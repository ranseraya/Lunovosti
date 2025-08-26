import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const { token } = req.nextauth;
    const { pathname } = req.nextUrl;
    const userRole = token?.role?.toUpperCase();

    if (token && (pathname.startsWith('/login') || pathname.startsWith('/register'))) {
      return NextResponse.redirect(new URL('/Home', req.url));
    }

    if (pathname.startsWith('/dashboard')) {
        if (userRole === 'AUTHOR' && (pathname.startsWith('/dashboard/admin') || pathname.startsWith('/dashboard/editor'))) {
            return NextResponse.redirect(new URL('/unauthorized', req.url));
        }
        if (userRole === 'EDITOR' && pathname.startsWith('/dashboard/admin')) {
            return NextResponse.redirect(new URL('/unauthorized', req.url));
        }
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        if (pathname.startsWith('/dashboard')) {
          return !!token;
        }
        return true;
      },
    },
    pages: {
      signIn: '/login',
    }
  }
);

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/register',
  ],
};