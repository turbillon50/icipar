'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, Calendar, ArrowLeft, Clock, MessageSquare, Tag } from 'lucide-react'

interface Church { id:number; name:string; denomination:string; city:string; state:string; founded_year:number; description:string }
interface Event { id:number; title:string; description:string; event_date:string; category:string; tags:string[] }
interface Testimony { id:number; author_name:string; content:string; year:number }

const CATEGORY_COLORS: Record<string,string> = {
  'Fundación':'#C9A84C','Avivamiento':'#F87171','Construcción':'#60A5FA',
  'Misiones':'#34D399','Conferencia':'#A78BFA','Aniversario':'#FBBF24','Patrimonio':'#FB923C'
}

export default function ChurchDetail() {
  const { id } = useParams()
  const [data, setData] = useState<{church:Church;events:Event[];testimonies:Testimony[]}|null>(null)
  const [activeTab, setActiveTab] = useState<'events'|'testimonies'>('events')

  useEffect(() => {
    fetch(`/api/churches/${id}`).then(r => r.json()).then(setData)
  }, [id])

  if (!data) return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div animate={{ rotate:360 }} transition={{ duration:1.5, repeat:Infinity, ease:'linear' }}
        className="w-10 h-10 border-2 border-amber-400 border-t-transparent rounded-full" />
    </div>
  )

  const { church, events, testimonies } = data

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-72 md:h-96 flex items-end overflow-hidden"
        style={{ background:'linear-gradient(135deg,#1a1108,#292524,#1C1917)' }}>
        <motion.div className="absolute inset-0 flex items-center justify-center opacity-10"
          animate={{ scale:[1,1.05,1] }} transition={{ duration:8, repeat:Infinity }}>
          <span className="text-[200px]">⛪</span>
        </motion.div>
        <div className="absolute inset-0" style={{ background:'linear-gradient(to top,#0C0A09 0%,transparent 60%)' }} />

        <div className="relative z-10 px-6 md:px-12 pb-10 max-w-7xl w-full mx-auto">
          <Link href="/app/churches" className="flex items-center gap-2 text-stone-400 hover:text-amber-400 text-sm mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Volver al archivo
          </Link>
          <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}>
            <span className="text-xs px-3 py-1 rounded-full mb-3 inline-block"
              style={{ background:'rgba(201,168,76,0.15)', color:'#C9A84C', border:'1px solid rgba(201,168,76,0.3)' }}>
              {church.denomination}
            </span>
            <h1 className="font-serif text-3xl md:text-5xl text-white mb-3">{church.name}</h1>
            <div className="flex flex-wrap gap-4 text-stone-400 text-sm">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-amber-400" />{church.city}, {church.state}</span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-amber-400" />Fundada en {church.founded_year}</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        {/* Description */}
        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }}
          className="text-stone-300 leading-relaxed mb-10 text-lg max-w-3xl border-l-2 border-amber-700 pl-5 italic font-serif">
          {church.description}
        </motion.p>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 p-1 rounded-2xl bg-stone-900/80 w-fit">
          {[
            { id:'events', label:`Eventos (${events.length})`, icon:Clock },
            { id:'testimonies', label:`Testimonios (${testimonies.length})`, icon:MessageSquare },
          ].map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab===t.id ? 'text-stone-950' : 'text-stone-400 hover:text-white'
              }`}
              style={activeTab===t.id ? { background:'linear-gradient(135deg,#C9A84C,#E8C96D)' } : {}}>
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>

        {/* Events timeline */}
        {activeTab === 'events' && (
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px timeline-line hidden md:block" />
            <div className="space-y-6">
              {events.map((e, i) => (
                <motion.div key={e.id}
                  initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*0.1 }}
                  className="md:pl-16 relative">
                  {/* Timeline dot */}
                  <div className="absolute left-4 top-6 w-4 h-4 rounded-full border-2 border-amber-400 bg-stone-950 hidden md:flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  </div>
                  <div className="parchment-card rounded-2xl p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <span className="text-xs px-2 py-1 rounded-full mr-2"
                          style={{ background:`${CATEGORY_COLORS[e.category] || '#C9A84C'}20`,
                                   color: CATEGORY_COLORS[e.category] || '#C9A84C' }}>
                          {e.category}
                        </span>
                        <h3 className="font-serif text-xl text-white mt-2">{e.title}</h3>
                      </div>
                      <div className="text-right">
                        <p className="gold-text font-serif text-2xl font-bold">{new Date(e.event_date).getFullYear()}</p>
                        <p className="text-stone-500 text-xs">{new Date(e.event_date).toLocaleDateString('es-MX',{month:'long',day:'numeric'})}</p>
                      </div>
                    </div>
                    <p className="text-stone-300 text-sm leading-relaxed mb-4">{e.description}</p>
                    {e.tags && e.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {e.tags.map(tag => (
                          <span key={tag} className="flex items-center gap-1 text-xs text-stone-500 bg-stone-800/60 px-2 py-1 rounded-full">
                            <Tag className="w-2.5 h-2.5" />{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Testimonies */}
        {activeTab === 'testimonies' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonies.length === 0 ? (
              <div className="col-span-2 text-center py-16 text-stone-500">
                <p className="text-4xl mb-4">📜</p>
                <p className="font-serif text-xl">No hay testimonios registrados aún</p>
              </div>
            ) : testimonies.map((t, i) => (
              <motion.div key={t.id}
                initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.1 }}
                className="parchment-card rounded-2xl p-6">
                <div className="text-4xl text-amber-600/30 font-serif leading-none mb-3">"</div>
                <p className="text-stone-300 text-sm leading-relaxed mb-4 italic">{t.content}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-amber-400 text-sm font-medium">{t.author_name}</p>
                  </div>
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
