'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Church, Calendar, MessageSquare, Users, TrendingUp, Plus, Settings, Database } from 'lucide-react'

interface Stats { churches: number; events: number; testimonies: number }

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ churches:0, events:0, testimonies:0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/churches').then(r=>r.json()),
      fetch('/api/events').then(r=>r.json()),
    ]).then(([c, e]) => {
      setStats({ churches: c.length, events: e.length, testimonies: 4 })
      setLoading(false)
    })
  }, [])

  const STAT_CARDS = [
    { icon: Church, label:'Iglesias registradas', value: stats.churches, color:'#C9A84C', href:'/admin/churches' },
    { icon: Calendar, label:'Eventos documentados', value: stats.events, color:'#A78BFA', href:'/admin/events' },
    { icon: MessageSquare, label:'Testimonios', value: stats.testimonies, color:'#34D399', href:'/admin/testimonies' },
    { icon: Users, label:'Usuarios admin', value: 2, color:'#F87171', href:'/admin/users' },
  ]

  const ACTIONS = [
    { icon: Plus, label:'Nueva Iglesia', href:'/admin/churches/new', color:'#C9A84C' },
    { icon: Calendar, label:'Nuevo Evento', href:'/admin/events/new', color:'#A78BFA' },
    { icon: MessageSquare, label:'Nuevo Testimonio', href:'/admin/testimonies/new', color:'#34D399' },
    { icon: Database, label:'Exportar Datos', href:'#', color:'#60A5FA' },
  ]

  return (
    <div className="min-h-screen px-6 py-10 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-3 h-3 rounded-full bg-red-400 animate-pulse" />
          <p className="text-red-400 text-sm font-medium">Panel de Administración</p>
        </div>
        <h1 className="font-serif text-4xl text-white">Dashboard <span className="gold-text">ICIPAR</span></h1>
        <p className="text-stone-400 mt-1">Gestiona todo el contenido de la biblioteca histórica</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {STAT_CARDS.map((s,i) => (
          <Link key={s.label} href={s.href}>
            <motion.div
              initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.08}}
              whileHover={{y:-3, scale:1.02}}
              className="parchment-card rounded-2xl p-5 cursor-pointer group">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{background:`${s.color}18`}}>
                  <s.icon className="w-5 h-5" style={{color:s.color}} />
                </div>
                <TrendingUp className="w-4 h-4 text-stone-600 group-hover:text-stone-400 transition-colors" />
              </div>
              <p className="font-serif text-3xl text-white font-bold mb-1">
                {loading ? '—' : s.value}
              </p>
              <p className="text-stone-500 text-xs">{s.label}</p>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3}}
        className="parchment-card rounded-2xl p-6 mb-8">
        <h2 className="font-serif text-xl text-white mb-5">Acciones Rápidas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ACTIONS.map((a,i) => (
            <Link key={a.label} href={a.href}>
              <motion.div whileHover={{scale:1.04,y:-2}} whileTap={{scale:0.97}}
                initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.4+i*0.05}}
                className="flex flex-col items-center gap-3 p-5 rounded-xl border border-stone-700/50 hover:border-amber-600/40 transition-all cursor-pointer text-center group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{background:`${a.color}15`}}>
                  <a.icon className="w-6 h-6 group-hover:scale-110 transition-transform" style={{color:a.color}} />
                </div>
                <span className="text-stone-400 group-hover:text-white text-xs transition-colors">{a.label}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Recent activity */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.4}}
        className="parchment-card rounded-2xl p-6">
        <h2 className="font-serif text-xl text-white mb-5">Actividad Reciente</h2>
        <div className="space-y-4">
          {[
            { action:'Iglesia registrada', item:'Centro Cristiano Nueva Vida Tijuana', time:'Hace 2 días', color:'#C9A84C' },
            { action:'Evento documentado', item:'Archivo Fotográfico Digitalizado — Oaxaca', time:'Hace 3 días', color:'#A78BFA' },
            { action:'Testimonio añadido', item:'Dr. Carlos Mendoza — Historiador', time:'Hace 5 días', color:'#34D399' },
            { action:'Iglesia actualizada', item:'Primera Iglesia Bautista de Guadalajara', time:'Hace 1 semana', color:'#F87171' },
          ].map((item, i) => (
            <motion.div key={i} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:0.5+i*0.06}}
              className="flex items-center gap-4 py-3 border-b border-stone-800/50 last:border-0">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{background:item.color}} />
              <div className="flex-1 min-w-0">
                <p className="text-stone-400 text-xs mb-0.5">{item.action}</p>
                <p className="text-white text-sm truncate">{item.item}</p>
              </div>
              <span className="text-stone-600 text-xs flex-shrink-0">{item.time}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
