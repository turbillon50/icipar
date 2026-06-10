'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Plus, Edit, Eye, MapPin, Calendar } from 'lucide-react'

interface Church { id:number; name:string; denomination:string; city:string; state:string; founded_year:number }

export default function AdminChurches() {
  const [churches, setChurches] = useState<Church[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/churches').then(r=>r.json()).then(d=>{setChurches(d);setLoading(false)})
  }, [])

  return (
    <div className="min-h-screen px-6 py-10 max-w-7xl mx-auto">
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-white">Gestión de <span className="gold-text">Iglesias</span></h1>
          <p className="text-stone-400 text-sm mt-1">{churches.length} iglesias registradas</p>
        </div>
        <Link href="/admin/churches/new">
          <motion.button whileHover={{scale:1.05}} whileTap={{scale:0.97}}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl font-medium text-stone-950"
            style={{background:'linear-gradient(135deg,#C9A84C,#E8C96D)'}}>
            <Plus className="w-4 h-4" /> Nueva Iglesia
          </motion.button>
        </Link>
      </motion.div>

      {loading ? (
        <div className="space-y-4">{[...Array(5)].map((_,i)=><div key={i} className="h-20 bg-stone-800/50 rounded-2xl animate-pulse"/>)}</div>
      ) : (
        <div className="space-y-3">
          {churches.map((c,i)=>(
            <motion.div key={c.id}
              initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:i*0.06}}
              className="parchment-card rounded-2xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-900/30 flex items-center justify-center text-xl flex-shrink-0">⛪</div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium">{c.name}</h3>
                <div className="flex flex-wrap gap-3 mt-1 text-xs text-stone-500">
                  <span>{c.denomination}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3"/>{c.city}, {c.state}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/>Est. {c.founded_year}</span>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Link href={`/app/churches/${c.id}`}>
                  <button className="p-2 rounded-xl text-stone-500 hover:text-amber-400 hover:bg-amber-900/20 transition-all">
                    <Eye className="w-4 h-4"/>
                  </button>
                </Link>
                <button className="p-2 rounded-xl text-stone-500 hover:text-white hover:bg-stone-700/50 transition-all">
                  <Edit className="w-4 h-4"/>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
