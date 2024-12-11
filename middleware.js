import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request) {
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  })

  const path = request.nextUrl.pathname

  // Public routes that don't require authentication
  const publicPaths = ['/auth/signin', '/auth/signup', '/']

  // Check if the path requires authentication
  if (!token && !publicPaths.includes(path)) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  // If user is already signed in, prevent access to signin/signup
  if (token && (path === '/auth/signin' || path === '/auth/signup')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

// Paths that will be checked by middleware
export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/profile/:path*',
    '/auth/signin',
    '/auth/signup'
  ]
}