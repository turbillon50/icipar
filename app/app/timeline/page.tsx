'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Event { id:number; title:string; description:string; event_date:string; category:string; church_name:string; denomination:string }

const CATEGORY_COLORS: Record<string,string> = {
  'Fundación':'#5B47C7','Avivamiento':'#F87171','Construcción':'#60A5FA',
  'Misiones':'#34D399','Conferencia':'#A78BFA','Aniversario':'#FBBF24','Patrimonio':'#FB923C'
}

export default function TimelinePage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/events').then(r=>r.json()).then(d=>{
      const sorted = [...d].sort((a,b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime())
      setEvents(sorted)
      setLoading(false)
    })
  }, [])

  const byDecade: Record<string, Event[]> = {}
  events.forEach(e => {
    const year = new Date(e.event_date).getFullYear()
    const decade = `${Math.floor(year/10)*10}s`
    if (!byDecade[decade]) byDecade[decade] = []
    byDecade[decade].push(e)
  })

  return (
    <div className="min-h-screen px-6 py-10 max-w-5xl mx-auto">
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="mb-12 text-center">
        <p className="text-amber-400 font-serif italic mb-2">Historia viva</p>
        <h1 className="font-serif text-4xl md:text-5xl text-white">Línea de <span className="gold-text">Tiempo</span></h1>
        <p className="text-stone-400 mt-3">Los momentos que definieron la historia del cristianismo en México</p>
      </motion.div>

      {loading ? (
        <div className="space-y-6">{[...Array(6)].map((_,i)=><div key={i} className="h-24 bg-stone-800/50 rounded-2xl animate-pulse"/>)}</div>
      ) : (
        <div className="relative">
          {/* Central line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
            style={{background:'linear-gradient(to bottom,transparent,#5B47C7 10%,#5B47C7 90%,transparent)'}} />

          {Object.entries(byDecade).sort().map(([decade, decadeEvents], di) => (
            <div key={decade} className="mb-12">
              {/* Decade marker */}
              <motion.div initial={{opacity:0,scale:0.8}} whileInView={{opacity:1,scale:1}} viewport={{once:true}}
                className="flex justify-center mb-8">
                <div className="px-6 py-2 rounded-full font-serif text-lg gold-text font-bold z-10"
                  style={{background:'linear-gradient(135deg,rgba(201,168,76,0.15),rgba(201,168,76,0.05))',
                          border:'1px solid rgba(201,168,76,0.4)'}}>
                  {decade}
                </div>
              </motion.div>

              {decadeEvents.map((e, i) => {
                const isLeft = i % 2 === 0
                return (
                  <motion.div key={e.id}
                    initial={{opacity:0, x: isLeft?-30:30}} whileInView={{opacity:1,x:0}}
                    transition={{delay:i*0.1}} viewport={{once:true}}
                    className={`flex mb-6 ${isLeft ? 'justify-start pr-[52%]' : 'justify-end pl-[52%]'}`}>
                    <div className="parchment-card rounded-2xl p-4 w-full relative">
                      {/* Dot connector */}
                      <div className={`absolute top-6 ${isLeft?'right-0 translate-x-full':'left-0 -translate-x-full'} flex items-center`}>
                        <div className={`h-px w-8 ${isLeft?'bg-gradient-to-r':'bg-gradient-to-l'} from-transparent to-amber-700`} />
                        <div className="w-3 h-3 rounded-full border-2 border-amber-400 bg-stone-950 flex-shrink-0" />
                      </div>
                      <div className="flex items-start gap-2 mb-2">
                        <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                          style={{background:`${CATEGORY_COLORS[e.category]||'#5B47C7'}20`,
                                  color:CATEGORY_COLORS[e.category]||'#5B47C7'}}>
                          {e.category}
                        </span>
                        <span className="gold-text font-serif font-bold text-sm ml-auto">
                          {new Date(e.event_date).getFullYear()}
                        </span>
                      </div>
                      <h3 className="font-serif text-sm text-white mb-1">{e.title}</h3>
                      <p className="text-stone-500 text-xs">{e.church_name}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
