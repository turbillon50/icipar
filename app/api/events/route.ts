import { NextResponse } from 'next/server'
import { getEvents } from '@/lib/db'

export async function GET() {
  try {
    const events = await getEvents()
    return NextResponse.json(events)
  } catch (e) {
    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }
}
