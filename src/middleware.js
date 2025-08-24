import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const { token } = req.nextauth;
    const { pathname } = req.nextUrl;

    if (token && pathname.startsWith('/login')) {
      return NextResponse.redirect(new URL('/Home', req.url));
    }

    if (pathname.startsWith('/admin')) {
      const allowedRoles = ['ADMIN', 'EDITOR', 'AUTHOR'];
      const userRole = token?.role?.toUpperCase();
      if (!token || !allowedRoles.includes(userRole)) {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/login',
    }
  }
);

export const config = {
  matcher: [
    '/admin/:path*',
    '/login',
  ],
};
