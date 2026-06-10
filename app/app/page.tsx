'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Church, Calendar, BookOpen, Search, Clock, TrendingUp } from '@/components/Icon'

interface Church { id: number; name: string; denomination: string; city: string; founded_year: number }
interface Event { id: number; title: string; event_date: string; category: string; church_name: string }

export default function AppDashboard() {
  const [churches, setChurches] = useState<Church[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/churches').then(r => r.json()),
      fetch('/api/events').then(r => r.json()),
    ]).then(([c, e]) => {
      setChurches(c.slice(0,4))
      setEvents(e.slice(0,5))
      setLoading(false)
    })
  }, [])

  return (
    <div className="min-h-screen px-6 py-10 max-w-7xl mx-auto">
      {/* Welcome */}
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
        className="mb-10">
        <p className="text-amber-400 font-serif italic mb-1">Bienvenido al archivo</p>
        <h1 className="font-serif text-4xl text-white">Biblioteca <span className="gold-text">ICIPAR</span></h1>
        <p className="text-stone-400 mt-2">Preservando el legado espiritual de las iglesias cristianas en México</p>
      </motion.div>

      {/* Quick actions */}
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { icon: Church, label: 'Ver Iglesias', href: '/app/churches', color: '#5B47C7' },
          { icon: Clock, label: 'Línea de Tiempo', href: '/app/timeline', color: '#A78BFA' },
          { icon: Search, label: 'Buscar', href: '/app/search', color: '#34D399' },
          { icon: BookOpen, label: 'Testimonios', href: '/app/testimonies', color: '#F87171' },
        ].map((a, i) => (
          <Link key={a.href} href={a.href}>
            <motion.div whileHover={{ scale:1.03, y:-2 }} whileTap={{ scale:0.97 }}
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1+i*0.05 }}
              className="parchment-card rounded-2xl p-5 text-center cursor-pointer group">
              <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                style={{ background:`${a.color}18` }}>
                <a.icon className="w-6 h-6" style={{ color: a.color }} />
              </div>
              <p className="text-sm text-stone-300 group-hover:text-white transition-colors">{a.label}</p>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Iglesias */}
        <motion.div initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.2 }}
          className="parchment-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-xl text-white">Iglesias Registradas</h2>
            <Link href="/app/churches" className="text-amber-400 text-sm hover:text-amber-300">Ver todas →</Link>
          </div>
          {loading ? (
            <div className="space-y-3">{[...Array(4)].map((_,i) => (
              <div key={i} className="h-16 bg-stone-800/50 rounded-xl animate-pulse" />
            ))}</div>
          ) : (
            <div className="space-y-3">
              {churches.map((c, i) => (
                <Link key={c.id} href={`/app/churches/${c.id}`}>
                  <motion.div whileHover={{ x:4 }}
                    initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.3+i*0.05 }}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-amber-900/10 transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-amber-900/30 flex items-center justify-center text-lg flex-shrink-0">✝</div>
                    <div className="min-w-0">
                      <p className="text-white text-sm font-medium truncate">{c.name}</p>
                      <p className="text-stone-500 text-xs">{c.denomination} · {c.city} · Fundada {c.founded_year}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          )}
        </motion.div>

        {/* Últimos eventos */}
        <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.3 }}
          className="parchment-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-xl text-white">Eventos Recientes</h2>
            <Link href="/app/timeline" className="text-amber-400 text-sm hover:text-amber-300">Ver línea →</Link>
          </div>
          {loading ? (
            <div className="space-y-3">{[...Array(5)].map((_,i) => (
              <div key={i} className="h-14 bg-stone-800/50 rounded-xl animate-pulse" />
            ))}</div>
          ) : (
            <div className="space-y-3">
              {events.map((e, i) => (
                <motion.div key={e.id}
                  initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4+i*0.05 }}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-amber-900/10 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-white text-sm font-medium truncate">{e.title}</p>
                    <p className="text-stone-500 text-xs">{e.church_name} · {new Date(e.event_date).getFullYear()} · {e.category}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
