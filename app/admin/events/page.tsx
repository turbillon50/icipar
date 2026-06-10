'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Calendar, Tag } from '@/components/Icon'
import Link from 'next/link'

interface Event { id:number; title:string; event_date:string; category:string; church_name:string }

const CATEGORY_COLORS: Record<string,string> = {
  'Fundación':'#5B47C7','Avivamiento':'#F87171','Construcción':'#60A5FA',
  'Misiones':'#34D399','Conferencia':'#A78BFA','Aniversario':'#FBBF24','Patrimonio':'#FB923C'
}

export default function AdminEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/events').then(r=>r.json()).then(d=>{setEvents(d);setLoading(false)})
  }, [])

  return (
    <div className="min-h-screen px-6 py-10 max-w-7xl mx-auto">
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-white">Gestión de <span className="gold-text">Eventos</span></h1>
          <p className="text-stone-400 text-sm mt-1">{events.length} eventos documentados</p>
        </div>
        <motion.button whileHover={{scale:1.05}} whileTap={{scale:0.97}}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl font-medium text-stone-950"
          style={{background:'linear-gradient(135deg,#A78BFA,#C4B5FD)'}}>
          <Plus className="w-4 h-4" /> Nuevo Evento
        </motion.button>
      </motion.div>

      {loading ? (
        <div className="space-y-4">{[...Array(5)].map((_,i)=><div key={i} className="h-20 bg-stone-800/50 rounded-2xl animate-pulse"/>)}</div>
      ) : (
        <div className="space-y-3">
          {events.map((e,i)=>(
            <motion.div key={e.id}
              initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:i*0.06}}
              className="parchment-card rounded-2xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{background:`${CATEGORY_COLORS[e.category]||'#5B47C7'}18`}}>
                <Calendar className="w-5 h-5" style={{color:CATEGORY_COLORS[e.category]||'#5B47C7'}}/>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium truncate">{e.title}</h3>
                <div className="flex flex-wrap gap-3 mt-1 text-xs text-stone-500">
                  <span>{e.church_name}</span>
                  <span>{new Date(e.event_date).getFullYear()}</span>
                  <span className="flex items-center gap-1" style={{color:CATEGORY_COLORS[e.category]||'#5B47C7'}}>
                    <Tag className="w-3 h-3"/>{e.category}
                  </span>
                </div>
              </div>
              <button className="p-2 rounded-xl text-stone-500 hover:text-white hover:bg-stone-700/50 transition-all flex-shrink-0">
                <Edit className="w-4 h-4"/>
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
