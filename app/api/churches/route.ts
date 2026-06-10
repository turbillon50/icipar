import { NextResponse } from 'next/server'
import { getChurches } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const churches = await getChurches()
    return NextResponse.json(churches)
  } catch {
    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }
}
