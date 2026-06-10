import { NextResponse } from 'next/server'
import { getChurches } from '@/lib/db'

export async function GET() {
  try {
    const churches = await getChurches()
    return NextResponse.json(churches)
  } catch (e) {
    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }
}
