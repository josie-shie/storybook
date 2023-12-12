import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.has('access');
    if (!token) return NextResponse.redirect(new URL('/?auth=login', request.url));
}

export const config = {
    matcher: ['/userInfo/:path*', '/notice/:path*']
};
