import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export default sql

export async function getChurches() {
  return await sql`SELECT * FROM churches ORDER BY founded_year ASC`
}

export async function getChurch(id: number) {
  const rows = await sql`SELECT * FROM churches WHERE id = ${id}`
  return rows[0] || null
}

export async function getEvents(churchId?: number) {
  if (churchId) {
    return await sql`SELECT * FROM events WHERE church_id = ${churchId} ORDER BY event_date DESC`
  }
  return await sql`
    SELECT e.*, c.name as church_name, c.denomination
    FROM events e
    JOIN churches c ON c.id = e.church_id
    ORDER BY e.event_date DESC
  `
}

export async function getTestimonies(churchId?: number) {
  if (churchId) {
    return await sql`SELECT * FROM testimonies WHERE church_id = ${churchId} ORDER BY year DESC`
  }
  return await sql`SELECT * FROM testimonies ORDER BY year DESC`
}

export async function searchAll(query: string) {
  return await sql`
    SELECT 'church' as type, id::text, name as title, denomination as subtitle, NULL as event_date
    FROM churches WHERE name ILIKE ${'%'+query+'%'} OR denomination ILIKE ${'%'+query+'%'}
    UNION ALL
    SELECT 'event' as type, id::text, title, category as subtitle, event_date
    FROM events WHERE title ILIKE ${'%'+query+'%'} OR description ILIKE ${'%'+query+'%'}
    ORDER BY type
    LIMIT 20
  `
}
