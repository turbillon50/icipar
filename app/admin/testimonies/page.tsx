'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2 } from 'lucide-react'

interface Testimony { id:number; author_name:string; content:string; year:number }

export default function AdminTestimonies() {
  const [testimonies, setTestimonies] = useState<Testimony[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/churches').then(r=>r.json()).then(async (churches) => {
      const all: Testimony[] = []
      for (const c of churches) {
        const d = await fetch(`/api/churches/${c.id}`).then(r=>r.json())
        all.push(...(d.testimonies||[]))
      }
      setTestimonies(all)
      setLoading(false)
    })
  }, [])

  return (
    <div className="min-h-screen px-6 py-10 max-w-5xl mx-auto">
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-white">Gestión de <span className="gold-text">Testimonios</span></h1>
          <p className="text-stone-400 text-sm mt-1">{testimonies.length} testimonios registrados</p>
        </div>
        <motion.button whileHover={{scale:1.05}} whileTap={{scale:0.97}}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl font-medium text-stone-950"
          style={{background:'linear-gradient(135deg,#34D399,#6EE7B7)'}}>
          <Plus className="w-4 h-4" /> Nuevo Testimonio
        </motion.button>
      </motion.div>

      {loading ? (
        <div className="space-y-4">{[...Array(4)].map((_,i)=><div key={i} className="h-32 bg-stone-800/50 rounded-2xl animate-pulse"/>)}</div>
      ) : (
        <div className="space-y-4">
          {testimonies.map((t,i)=>(
            <motion.div key={t.id}
              initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:i*0.08}}
              className="parchment-card rounded-2xl p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="text-amber-400 font-medium">{t.author_name}</p>
                    <span className="gold-text font-serif">{t.year}</span>
                  </div>
                  <p className="text-stone-300 text-sm italic leading-relaxed line-clamp-3">"{t.content}"</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button className="p-2 rounded-xl text-stone-500 hover:text-white hover:bg-stone-700/50 transition-all">
                    <Edit className="w-4 h-4"/>
                  </button>
                  <button className="p-2 rounded-xl text-stone-500 hover:text-red-400 hover:bg-red-900/20 transition-all">
                    <Trash2 className="w-4 h-4"/>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
