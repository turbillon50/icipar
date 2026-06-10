import { NextResponse } from 'next/server'
import { getEvents } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const events = await getEvents()
    return NextResponse.json(events)
  } catch {
    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }
}
