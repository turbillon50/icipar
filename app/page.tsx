'use client'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Search, Clock, Church, Shield, Download, ChevronRight, Star, Archive } from 'lucide-react'
import ModeSwitcher from '@/components/ModeSwitcher'
import SplashScreen from '@/components/SplashScreen'

const STATS = [
  { value: '5+', label: 'Iglesias registradas' },
  { value: '130+', label: 'Años de historia' },
  { value: '1,200+', label: 'Archivos digitales' },
  { value: '50+', label: 'Testimonios' },
]

const FEATURES = [
  { icon: Church, title: 'Registro de Iglesias', desc: 'Documenta cada congregación con nombre, denominación, ubicación y año de fundación.' },
  { icon: Archive, title: 'Archivo Histórico', desc: 'Almacena sucesos, fotografías y documentos organizados por fecha y categoría.' },
  { icon: Search, title: 'Búsqueda Avanzada', desc: 'Localiza cualquier evento, iglesia o testimonio en segundos con filtros precisos.' },
  { icon: Clock, title: 'Línea de Tiempo', desc: 'Visualiza la historia de cada iglesia en una línea temporal interactiva y elegante.' },
  { icon: Star, title: 'Testimonios', desc: 'Espacio sagrado para conservar las historias de fe de generaciones pasadas.' },
  { icon: Download, title: 'Exportación', desc: 'Exporta la información para facilitar la elaboración de tu libro de historia.' },
]

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 2800)
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll)
    return () => { clearTimeout(t); window.removeEventListener('scroll', onScroll) }
  }, [])

  return (
    <>
      <AnimatePresence>{showSplash && <SplashScreen />}</AnimatePresence>
      <ModeSwitcher currentMode="public" />

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Ken-Burns BG */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center animate-ken-burns"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1548625361-56d3bd9a4e54?w=1600&q=80')" }}
          />
          <div className="hero-overlay absolute inset-0" />
          {/* Gold particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div key={i}
              className="absolute w-1 h-1 rounded-full bg-amber-400 opacity-60"
              style={{ left: `${15+i*15}%`, top: `${20+i*8}%` }}
              animate={{ y: [-10, 10, -10], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3+i, repeat: Infinity, delay: i*0.5 }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          {/* Cross ornament */}
          <motion.div initial={{ opacity:0, scale:0.5 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.3 }}
            className="text-6xl mb-6 animate-float inline-block">✝</motion.div>

          <motion.h1 initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5, duration:0.8 }}
            className="font-serif text-5xl md:text-7xl mb-6 leading-tight">
            <span className="gold-text">ICIPAR</span>
          </motion.h1>

          <motion.p initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.7, duration:0.8 }}
            className="font-serif text-xl md:text-2xl text-parchment/90 mb-4 italic">
            Biblioteca Histórica de Iglesias Cristianas
          </motion.p>

          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1 }}
            className="text-stone-300 text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Preserva, documenta y comparte el legado espiritual de tu congregación.<br/>
            Toda la historia de tu iglesia, organizada en un solo lugar sagrado.
          </motion.p>

          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/app">
              <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }}
                className="px-8 py-4 rounded-full font-semibold text-stone-950 text-lg shadow-lg shadow-amber-600/30"
                style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C96D, #B45309)' }}>
                Explorar Demo
                <ChevronRight className="inline ml-2 w-5 h-5" />
              </motion.button>
            </Link>
            <Link href="/app/churches">
              <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }}
                className="px-8 py-4 rounded-full font-semibold text-amber-400 border border-amber-400/50 hover:border-amber-400 transition-colors">
                Ver Iglesias
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y:[0,10,0] }} transition={{ duration:2, repeat:Infinity }}>
          <div className="w-6 h-10 border-2 border-amber-400/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-amber-400 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="py-16 border-y border-amber-900/30" style={{ background: 'linear-gradient(90deg, #0C0A09 0%, #1C1917 50%, #0C0A09 100%)' }}>
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
              transition={{ delay: i*0.1 }} viewport={{ once:true }}
              className="text-center">
              <div className="font-serif text-4xl md:text-5xl gold-text font-bold mb-2">{s.value}</div>
              <div className="text-stone-400 text-sm">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          className="text-center mb-16">
          <p className="text-amber-400 font-serif italic text-lg mb-3">La plataforma incluye</p>
          <h2 className="font-serif text-4xl md:text-5xl text-white">Todo lo que necesitas para<br/><span className="gold-text">preservar tu historia</span></h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div key={f.title}
              initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }}
              transition={{ delay: i*0.1 }} viewport={{ once:true }}
              whileHover={{ y:-4, borderColor:'rgba(201,168,76,0.5)' }}
              className="parchment-card rounded-2xl p-6 cursor-default transition-all duration-300">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background:'linear-gradient(135deg,rgba(201,168,76,0.2),rgba(201,168,76,0.05))' }}>
                <f.icon className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="font-serif text-lg text-white mb-2">{f.title}</h3>
              <p className="text-stone-400 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 px-6 text-center" style={{ background:'linear-gradient(180deg,#0C0A09 0%,#1a1108 50%,#0C0A09 100%)' }}>
        <motion.div initial={{ opacity:0, scale:0.95 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }}
          className="max-w-3xl mx-auto parchment-card rounded-3xl p-12">
          <div className="text-5xl mb-6">📖</div>
          <h2 className="font-serif text-4xl text-white mb-4">¿Listo para preservar<br/><span className="gold-text">el legado de tu iglesia?</span></h2>
          <p className="text-stone-400 mb-8 leading-relaxed">
            Toda la información organizada en un solo lugar, facilitando la recopilación,<br/>
            consulta y documentación de los acontecimientos de cada iglesia a lo largo del tiempo.
          </p>
          <Link href="/app">
            <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }}
              className="px-10 py-4 rounded-full font-bold text-stone-950 text-lg"
              style={{ background:'linear-gradient(135deg,#C9A84C,#E8C96D,#B45309)' }}>
              Comenzar Ahora — Es Gratis
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-amber-900/20 text-center text-stone-500 text-sm">
        <p className="gold-text font-serif text-lg mb-1">ICIPAR</p>
        <p>Preservando el legado espiritual de México © 2025</p>
        <p className="mt-1 text-xs text-stone-600">Desarrollado por V Momentum · vmomentums.info</p>
      </footer>
    </>
  )
}
