'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, Calendar, ChevronRight } from 'lucide-react'

interface Church { id: number; name: string; denomination: string; city: string; state: string; founded_year: number; description: string }

const DENOMINATION_COLORS: Record<string, string> = {
  'Bautista': '#60A5FA',
  'Pentecostal': '#F87171',
  'Evangélica': '#34D399',
  'Metodista': '#A78BFA',
  'Carismática': '#FBBF24',
}

export default function ChurchesPage() {
  const [churches, setChurches] = useState<Church[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    fetch('/api/churches').then(r => r.json()).then(d => { setChurches(d); setLoading(false) })
  }, [])

  const filtered = churches.filter(c =>
    !filter || c.denomination.toLowerCase().includes(filter.toLowerCase())
  )
  const denominations = [...new Set(churches.map(c => c.denomination))]

  return (
    <div className="min-h-screen px-6 py-10 max-w-7xl mx-auto">
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="mb-8">
        <p className="text-amber-400 font-serif italic mb-1">Archivo histórico</p>
        <h1 className="font-serif text-4xl text-white mb-2">Iglesias <span className="gold-text">Registradas</span></h1>
        <p className="text-stone-400">{churches.length} congregaciones documentadas</p>
      </motion.div>

      {/* Filters */}
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.1 }}
        className="flex flex-wrap gap-3 mb-8">
        <button onClick={() => setFilter('')}
          className={`px-4 py-2 rounded-full text-sm transition-all ${!filter ? 'bg-amber-600 text-white' : 'text-stone-400 border border-stone-700 hover:border-amber-600'}`}>
          Todas
        </button>
        {denominations.map(d => (
          <button key={d} onClick={() => setFilter(d)}
            className={`px-4 py-2 rounded-full text-sm transition-all ${filter===d ? 'text-stone-950 font-medium' : 'text-stone-400 border border-stone-700 hover:border-amber-600'}`}
            style={filter===d ? { background: DENOMINATION_COLORS[d] || '#C9A84C' } : {}}>
            {d}
          </button>
        ))}
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_,i) => <div key={i} className="h-64 bg-stone-800/50 rounded-2xl animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c, i) => (
            <Link key={c.id} href={`/app/churches/${c.id}`}>
              <motion.div
                initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.08 }}
                whileHover={{ y:-4, borderColor:'rgba(201,168,76,0.5)' }}
                className="parchment-card rounded-2xl overflow-hidden cursor-pointer group h-full flex flex-col"
              >
                {/* Church illustration top */}
                <div className="h-36 relative flex items-center justify-center overflow-hidden"
                  style={{ background:'linear-gradient(135deg,#1a1108,#292524)' }}>
                  <motion.div animate={{ y:[0,-6,0] }} transition={{ duration:4, repeat:Infinity }}
                    className="text-6xl opacity-40">⛪</motion.div>
                  <div className="absolute bottom-0 left-0 right-0 h-12"
                    style={{ background:'linear-gradient(to top,rgba(28,25,23,1),transparent)' }} />
                  <span className="absolute top-3 right-3 text-xs px-2 py-1 rounded-full"
                    style={{ background:`${DENOMINATION_COLORS[c.denomination] || '#C9A84C'}25`,
                             color: DENOMINATION_COLORS[c.denomination] || '#C9A84C' }}>
                    {c.denomination}
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-serif text-lg text-white mb-2 group-hover:text-amber-300 transition-colors">{c.name}</h3>
                  <p className="text-stone-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-2">{c.description}</p>
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{c.city}, {c.state}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />Est. {c.founded_year}</span>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-amber-400 text-xs font-medium group-hover:gap-2 transition-all">
                    Ver historia <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
