'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Church, Calendar, X } from '@/components/Icon'

interface Result { type:string; id:string; title:string; subtitle:string; event_date?:string }

export default function SearchPage() {
  const [q, setQ] = useState('')
  const [results, setResults] = useState<Result[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { inputRef.current?.focus() }, [])

  useEffect(() => {
    if (!q.trim()) { setResults([]); return }
    const t = setTimeout(() => {
      setLoading(true)
      fetch(`/api/search?q=${encodeURIComponent(q)}`)
        .then(r=>r.json()).then(d=>{ setResults(d); setLoading(false) })
    }, 350)
    return () => clearTimeout(t)
  }, [q])

  return (
    <div className="min-h-screen px-6 py-10 max-w-3xl mx-auto">
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="mb-8">
        <p className="text-amber-400 font-serif italic mb-1">Encuentra lo que buscas</p>
        <h1 className="font-serif text-4xl text-white mb-2">Buscador <span className="gold-text">Histórico</span></h1>
      </motion.div>

      {/* Search input */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}}
        className="relative mb-8">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500" />
        <input ref={inputRef} value={q} onChange={e=>setQ(e.target.value)}
          placeholder="Buscar iglesia, evento, denominación..."
          className="w-full pl-14 pr-12 py-4 rounded-2xl text-white placeholder-stone-500 outline-none text-lg transition-all"
          style={{background:'rgba(41,37,36,0.8)', border:'1px solid rgba(201,168,76,0.2)'}}
          onFocus={e=>(e.target.style.borderColor='rgba(201,168,76,0.6)')}
          onBlur={e=>(e.target.style.borderColor='rgba(201,168,76,0.2)')}
        />
        {q && <button onClick={()=>setQ('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 hover:text-white">
          <X className="w-5 h-5" />
        </button>}
      </motion.div>

      {/* Suggestions */}
      {!q && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.2}}>
          <p className="text-stone-500 text-sm mb-4">Búsquedas sugeridas:</p>
          <div className="flex flex-wrap gap-3">
            {['Bautista','Avivamiento','Guadalajara','1900s','Fundación','Misioneros'].map(s=>(
              <button key={s} onClick={()=>setQ(s)}
                className="px-4 py-2 rounded-full text-sm text-stone-400 border border-stone-700 hover:border-amber-600 hover:text-amber-400 transition-all">
                {s}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Results */}
      {loading && <div className="flex justify-center py-12">
        <motion.div animate={{rotate:360}} transition={{duration:1.5,repeat:Infinity,ease:'linear'}}
          className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full" />
      </div>}

      <AnimatePresence>
        {results.length > 0 && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            <p className="text-stone-500 text-sm mb-4">{results.length} resultado{results.length!==1?'s':''} para "{q}"</p>
            <div className="space-y-3">
              {results.map((r,i)=>(
                <motion.div key={`${r.type}-${r.id}`}
                  initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}}>
                  <Link href={r.type==='church' ? `/app/churches/${r.id}` : '/app/timeline'}>
                    <div className="parchment-card rounded-2xl p-4 hover:border-amber-600/50 transition-all cursor-pointer flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{background:'rgba(201,168,76,0.1)'}}>
                        {r.type==='church' ? <Church className="w-5 h-5 text-amber-400"/> : <Calendar className="w-5 h-5 text-purple-400"/>}
                      </div>
                      <div>
                        <p className="text-xs text-stone-500 mb-0.5 uppercase tracking-wide">{r.type==='church'?'Iglesia':'Evento'}</p>
                        <p className="text-white text-sm font-medium">{r.title}</p>
                        <p className="text-stone-400 text-xs">{r.subtitle}{r.event_date ? ` · ${new Date(r.event_date).getFullYear()}` : ''}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {q && !loading && results.length===0 && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="text-center py-16">
          <p className="text-4xl mb-4">🔍</p>
          <p className="font-serif text-xl text-stone-400">No se encontraron resultados para "{q}"</p>
        </motion.div>
      )}
    </div>
  )
}
