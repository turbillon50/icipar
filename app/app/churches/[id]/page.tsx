'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, Calendar, ArrowLeft, Clock, MessageSquare, Tag } from 'lucide-react'

interface Church { id:number; name:string; denomination:string; city:string; state:string; founded_year:number; description:string }
interface Event { id:number; title:string; description:string; event_date:string; category:string; tags:string[] }
interface Testimony { id:number; author_name:string; content:string; year:number }

const CAT: Record<string,string> = {
  'Fundacion':'#C9A84C','Avivamiento':'#F87171','Construccion':'#60A5FA',
  'Misiones':'#34D399','Conferencia':'#A78BFA','Aniversario':'#FBBF24','Patrimonio':'#FB923C'
}

export default function ChurchDetail() {
  const params = useParams()
  const id = params.id as string
  const [data, setData] = useState<any>(null)
  const [tab, setTab] = useState<'events'|'testimonies'>('events')

  useEffect(() => {
    if (id) fetch(`/api/churches/${id}`).then(r => r.json()).then(setData)
  }, [id])

  if (!data) return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div animate={{ rotate:360 }} transition={{ duration:1.5, repeat:Infinity, ease:'linear' }}
        className="w-10 h-10 border-2 border-amber-400 border-t-transparent rounded-full" />
    </div>
  )

  const { church, events, testimonies } = data
  const catColor = (c: string) => CAT[c] || '#C9A84C'

  return (
    <div className="min-h-screen">
      <div className="relative h-72 flex items-end overflow-hidden"
        style={{ background:'linear-gradient(135deg,#1a1108,#292524)' }}>
        <motion.div className="absolute inset-0 flex items-center justify-center opacity-10"
          animate={{ scale:[1,1.05,1] }} transition={{ duration:8, repeat:Infinity }}>
          <span style={{fontSize:'160px'}}>⛪</span>
        </motion.div>
        <div className="absolute inset-0" style={{ background:'linear-gradient(to top,#0C0A09 0%,transparent 60%)' }} />
        <div className="relative z-10 px-6 pb-10 max-w-7xl w-full mx-auto">
          <Link href="/app/churches" className="flex items-center gap-2 text-stone-400 text-sm mb-4" style={{color:'#A8A29E'}}>
            <ArrowLeft className="w-4 h-4" /> Volver
          </Link>
          <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}>
            <span className="text-xs px-3 py-1 rounded-full mb-3 inline-block"
              style={{ background:'rgba(201,168,76,0.15)', color:'#C9A84C' }}>
              {church.denomination}
            </span>
            <h1 className="font-serif text-white mb-3" style={{fontSize:'clamp(1.5rem,4vw,3rem)'}}>{church.name}</h1>
            <div className="flex gap-4 text-stone-400 text-sm flex-wrap">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" style={{color:'#C9A84C'}} />{church.city}, {church.state}</span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" style={{color:'#C9A84C'}} />Fundada {church.founded_year}</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }}
          className="text-stone-300 leading-relaxed mb-10 text-lg max-w-3xl font-serif italic"
          style={{borderLeft:'2px solid #B45309', paddingLeft:'1.25rem'}}>
          {church.description}
        </motion.p>

        <div className="flex gap-1 mb-8 p-1 rounded-2xl w-fit" style={{background:'#1C1917'}}>
          {[
            { id:'events' as const, label:`Eventos (${events.length})`, icon:Clock },
            { id:'testimonies' as const, label:`Testimonios (${testimonies.length})`, icon:MessageSquare },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={tab===t.id
                ? {background:'linear-gradient(135deg,#C9A84C,#E8C96D)', color:'#0C0A09'}
                : {color:'#A8A29E'}}>
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'events' && (
          <div className="space-y-6">
            {events.map((e: Event, i: number) => (
              <motion.div key={e.id}
                initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*0.1 }}
                className="parchment-card rounded-2xl p-6">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-xs px-2 py-1 rounded-full"
                      style={{ background:`${catColor(e.category)}20`, color:catColor(e.category) }}>
                      {e.category}
                    </span>
                    <h3 className="font-serif text-xl text-white mt-2">{e.title}</h3>
                  </div>
                  <p className="gold-text font-serif text-2xl font-bold">{new Date(e.event_date).getFullYear()}</p>
                </div>
                <p className="text-stone-300 text-sm leading-relaxed mb-4">{e.description}</p>
                {e.tags && (
                  <div className="flex flex-wrap gap-2">
                    {e.tags.map((tag: string) => (
                      <span key={tag} className="flex items-center gap-1 text-xs text-stone-500 px-2 py-1 rounded-full"
                        style={{background:'rgba(41,37,36,0.8)'}}>
                        <Tag className="w-2.5 h-2.5" />{tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'testimonies' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonies.length === 0 ? (
              <div className="col-span-2 text-center py-16" style={{color:'#78716C'}}>
                <p className="text-4xl mb-4">📜</p>
                <p className="font-serif text-xl">Sin testimonios aún</p>
              </div>
            ) : testimonies.map((t: Testimony, i: number) => (
              <motion.div key={t.id}
                initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.1 }}
                className="parchment-card rounded-2xl p-6">
                <div className="text-4xl opacity-20 font-serif leading-none mb-3" style={{color:'#C9A84C'}}>"</div>
                <p className="text-stone-300 text-sm leading-relaxed mb-4 italic">{t.content}</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium" style={{color:'#C9A84C'}}>{t.author_name}</p>
                  <span className="gold-text font-serif text-lg">{t.year}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
