import { NextResponse } from 'next/server'
import { searchAll } from '@/lib/db'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const q = url.searchParams.get('q') || ''
  if (!q.trim()) return NextResponse.json([])
  try {
    const results = await searchAll(q)
    return NextResponse.json(results)
  } catch (e) {
    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }
}
