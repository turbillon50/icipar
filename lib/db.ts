import { neon } from '@neondatabase/serverless'
import { DEMO_CHURCHES, DEMO_EVENTS, DEMO_TESTIMONIES } from './demo-data'

let _sql: ReturnType<typeof neon> | null = null
function getSql() {
  if (_sql) return _sql
  const url = process.env.DATABASE_URL
  if (!url) return null
  _sql = neon(url)
  return _sql
}
export default getSql

export async function getChurches() {
  try {
    const sql = getSql(); if (!sql) return DEMO_CHURCHES
    const rows = (await sql`SELECT * FROM churches ORDER BY founded_year ASC`) as any[]
    return rows.length ? rows : DEMO_CHURCHES
  } catch { return DEMO_CHURCHES }
}
export async function getChurch(id: number) {
  try {
    const sql = getSql(); if (!sql) return DEMO_CHURCHES.find(c => c.id === id) || null
    const rows = (await sql`SELECT * FROM churches WHERE id = ${id}`) as any[]
    return rows[0] || DEMO_CHURCHES.find(c => c.id === id) || null
  } catch { return DEMO_CHURCHES.find(c => c.id === id) || null }
}
export async function getEvents(churchId?: number) {
  try {
    const sql = getSql()
    if (!sql) return churchId ? DEMO_EVENTS.filter(e => e.church_id === churchId) : DEMO_EVENTS
    if (churchId) return (await sql`SELECT * FROM events WHERE church_id = ${churchId} ORDER BY event_date DESC`) as any[]
    const rows = (await sql`SELECT e.*, c.name as church_name, c.denomination FROM events e JOIN churches c ON c.id = e.church_id ORDER BY e.event_date DESC`) as any[]
    return rows.length ? rows : DEMO_EVENTS
  } catch { return churchId ? DEMO_EVENTS.filter(e => e.church_id === churchId) : DEMO_EVENTS }
}
export async function getTestimonies(churchId?: number) {
  try {
    const sql = getSql()
    if (!sql) return churchId ? DEMO_TESTIMONIES.filter(t => t.church_id === churchId) : DEMO_TESTIMONIES
    if (churchId) return (await sql`SELECT * FROM testimonies WHERE church_id = ${churchId} ORDER BY year DESC`) as any[]
    const rows = (await sql`SELECT * FROM testimonies ORDER BY year DESC`) as any[]
    return rows.length ? rows : DEMO_TESTIMONIES
  } catch { return churchId ? DEMO_TESTIMONIES.filter(t => t.church_id === churchId) : DEMO_TESTIMONIES }
}
export async function searchAll(query: string) {
  try {
    const sql = getSql()
    if (!sql) {
      const q = query.toLowerCase()
      const ch = DEMO_CHURCHES.filter(c => c.name.toLowerCase().includes(q) || c.denomination.toLowerCase().includes(q)).map(c => ({ type:'church', id:String(c.id), title:c.name, subtitle:c.denomination, event_date:null }))
      const ev = DEMO_EVENTS.filter(e => e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q)).map(e => ({ type:'event', id:String(e.id), title:e.title, subtitle:e.category, event_date:e.event_date }))
      return [...ch, ...ev].slice(0,20)
    }
    return (await sql`
      SELECT 'church' as type, id::text, name as title, denomination as subtitle, NULL as event_date
      FROM churches WHERE name ILIKE ${'%'+query+'%'} OR denomination ILIKE ${'%'+query+'%'}
      UNION ALL
      SELECT 'event' as type, id::text, title, category as subtitle, event_date
      FROM events WHERE title ILIKE ${'%'+query+'%'} OR description ILIKE ${'%'+query+'%'}
      ORDER BY type LIMIT 20`) as any[]
  } catch { return [] }
}
