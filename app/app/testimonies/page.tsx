'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Testimony { id:number; author_name:string; content:string; year:number; church_id:number }

export default function TestimoniesPage() {
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
    <div className="min-h-screen px-6 py-10 max-w-4xl mx-auto">
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="mb-10 text-center">
        <p className="text-amber-400 font-serif italic mb-2">Voces del pasado</p>
        <h1 className="font-serif text-4xl md:text-5xl text-white">Testimonios <span className="gold-text">de Fe</span></h1>
        <p className="text-stone-400 mt-3 max-w-xl mx-auto">Historias reales de personas que vivieron momentos fundacionales en sus congregaciones</p>
      </motion.div>

      {/* Ornament */}
      <motion.div animate={{opacity:[0.3,0.7,0.3]}} transition={{duration:3,repeat:Infinity}}
        className="text-center text-4xl mb-12">✦ ✝ ✦</motion.div>

      {loading ? (
        <div className="space-y-6">{[...Array(4)].map((_,i)=><div key={i} className="h-40 bg-stone-800/50 rounded-2xl animate-pulse"/>)}</div>
      ) : (
        <div className="space-y-8">
          {testimonies.map((t,i)=>(
            <motion.div key={t.id}
              initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}}
              transition={{delay:i*0.1}} viewport={{once:true}}
              className="parchment-card rounded-3xl p-8 relative overflow-hidden">
              {/* Decorative quote mark */}
              <div className="absolute top-4 left-6 text-7xl text-amber-700/15 font-serif leading-none select-none">"</div>
              <div className="absolute bottom-4 right-6 text-7xl text-amber-700/15 font-serif leading-none rotate-180 select-none">"</div>
              <div className="relative z-10">
                <p className="text-stone-200 text-base md:text-lg leading-relaxed italic font-serif mb-6 pt-4">
                  {t.content}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-amber-400 font-medium">{t.author_name}</p>
                  </div>
                  <span className="gold-text font-serif text-xl font-bold">{t.year}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
