import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const to = req.nextUrl.searchParams.get('to') || '/app'
  const res = NextResponse.redirect(new URL(to, req.url))
  res.cookies.set('icipar_demo', '1', { path: '/', maxAge: 60 * 60 * 24 * 7, sameSite: 'lax' })
  return res
}
