import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Countries to block (expanded list for security)
const BLOCKED_COUNTRIES = ['RU', 'CN', 'VN', 'IQ', 'KP', 'IR']

// Common exploit paths that bots probe for
const BLOCKED_PATHS = [
  '/wp-admin',
  '/wp-login',
  '/xmlrpc.php',
  '/.env',
  '/phpMyAdmin',
  '/admin.php',
  '/.git',
  '/config.php',
]

export function proxy(request: NextRequest) {
  // Get country from Vercel's header
  const country = request.headers.get('x-vercel-ip-country') || ''
  const userAgent = request.headers.get('user-agent') || ''
  const pathname = request.nextUrl.pathname.toLowerCase()

  // 1. Block restricted countries
  if (BLOCKED_COUNTRIES.includes(country)) {
    return new NextResponse('Access denied.', { status: 403 })
  }

  // 2. Block empty or suspiciously short user agents (bots)
  if (!userAgent || userAgent.length < 10) {
    return new NextResponse('Access denied.', { status: 403 })
  }

  // 3. Block common exploit paths (return 404 to not reveal site structure)
  if (BLOCKED_PATHS.some(path => pathname.startsWith(path))) {
    return new NextResponse('Not found.', { status: 404 })
  }

  // Allow request to continue
  return NextResponse.next()
}

// Run proxy on all routes except static files
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.svg|.*\\.jpg).*)',
  ],
}