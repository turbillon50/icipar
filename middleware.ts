import { NextRequest, NextResponse } from 'next/server'

const PROTECTED = ['/app', '/admin']

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const needsGuard = PROTECTED.some(p => pathname === p || pathname.startsWith(p + '/'))
  if (!needsGuard) return NextResponse.next()
  const demo = req.cookies.get('icipar_demo')?.value
  if (demo === '1') return NextResponse.next()
  const url = req.nextUrl.clone()
  url.pathname = '/login'
  url.searchParams.set('to', pathname)
  return NextResponse.redirect(url)
}

export const config = { matcher: ['/app/:path*', '/admin/:path*'] }
