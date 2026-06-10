import { NextResponse } from 'next/server'
import { getChurch, getEvents, getTestimonies } from '@/lib/db'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id)
    const [church, events, testimonies] = await Promise.all([
      getChurch(id),
      getEvents(id),
      getTestimonies(id),
    ])
    if (!church) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ church, events, testimonies })
  } catch (e) {
    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }
}
