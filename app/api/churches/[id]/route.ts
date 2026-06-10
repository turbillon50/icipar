import { NextResponse } from 'next/server'
import { getChurch, getEvents, getTestimonies } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id: idStr } = await context.params
    const id = parseInt(idStr)
    const [church, events, testimonies] = await Promise.all([
      getChurch(id),
      getEvents(id),
      getTestimonies(id),
    ])
    if (!church) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ church, events, testimonies })
  } catch {
    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }
}
