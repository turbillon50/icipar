'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Clock, Church, Download, ChevronRight, Star, Archive } from '@/components/Icon'
import ModeSwitcher from '@/components/ModeSwitcher'
import SplashScreen from '@/components/SplashScreen'

const STATS = [
  { value: '5+', label: 'Iglesias registradas' },
  { value: '130+', label: 'Años de historia' },
  { value: '1,200+', label: 'Archivos digitales' },
  { value: '50+', label: 'Testimonios' },
]
const FEATURES = [
  { Icon: Church, title: 'Registro de Iglesias', desc: 'Documenta cada congregación con nombre, denominación, ubicación y año de fundación.' },
  { Icon: Archive, title: 'Archivo Histórico', desc: 'Almacena sucesos, fotografías y documentos organizados por fecha y categoría.' },
  { Icon: Search, title: 'Búsqueda Avanzada', desc: 'Localiza cualquier evento, iglesia o testimonio en segundos con filtros precisos.' },
  { Icon: Clock, title: 'Línea de Tiempo', desc: 'Visualiza la historia de cada iglesia en una línea temporal interactiva y elegante.' },
  { Icon: Star, title: 'Testimonios', desc: 'Espacio especial para conservar las historias de fe de generaciones pasadas.' },
  { Icon: Download, title: 'Exportación', desc: 'Exporta la información para facilitar la elaboración de tu libro de historia.' },
]

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 2600)
    return () => clearTimeout(t)
  }, [])
  return (
    <>
      <AnimatePresence>{showSplash && <SplashScreen />}</AnimatePresence>
      <ModeSwitcher currentMode="public" />

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center animate-ken-burns" style={{ backgroundImage: "url('/images/hero.jpg')" }} />
          <div className="hero-overlay absolute inset-0" />
          {[...Array(6)].map((_, i) => (
            <motion.div key={i} className="absolute w-1 h-1 rounded-full" style={{ left: `${15 + i * 15}%`, top: `${20 + i * 8}%`, background: 'var(--brand-2)' }}
              animate={{ y: [-10, 10, -10], opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }} />
          ))}
        </div>
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
            className="mb-6 animate-float inline-block"><img src="/logo.png" alt="ICIPAR" className="w-24 h-24 rounded-full object-cover shadow-2xl" /></motion.div>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
            className="font-serif text-5xl md:text-7xl mb-6 leading-tight"><span className="gold-text">ICIPAR</span></motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }}
            className="font-serif text-xl md:text-2xl mb-4 italic" style={{ color: 'var(--ink)' }}>Biblioteca Histórica de Iglesias Cristianas</motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            className="text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--muted)' }}>
            Preserva, documenta y comparte el legado espiritual de tu congregación.<br />Toda la historia de tu iglesia, organizada en un solo lugar.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/api/demo?to=/app">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-full font-semibold text-white text-lg shadow-lg brand-grad flex items-center gap-2 justify-center">
                Explorar Demo <ChevronRight />
              </motion.button>
            </a>
            <Link href="/login">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-full font-semibold transition-colors" style={{ color: 'var(--brand)', border: '1.5px solid var(--brand)' }}>
                Crear cuenta
              </motion.button>
            </Link>
          </motion.div>
        </div>
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <div className="w-6 h-10 rounded-full flex justify-center pt-2" style={{ border: '2px solid var(--brand)' }}>
            <div className="w-1 h-3 rounded-full" style={{ background: 'var(--brand)' }} />
          </div>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="py-16" style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="text-center">
              <div className="font-serif text-4xl md:text-5xl gold-text font-bold mb-2">{s.value}</div>
              <div className="text-sm" style={{ color: 'var(--muted)' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="font-serif italic text-lg mb-3" style={{ color: 'var(--brand)' }}>La plataforma incluye</p>
          <h2 className="font-serif text-4xl md:text-5xl text-white">Todo lo que necesitas para<br /><span className="gold-text">preservar tu historia</span></h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => {
            const I = f.Icon
            return (
              <motion.div key={f.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                whileHover={{ y: -4 }} className="parchment-card rounded-2xl p-6 cursor-default">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-[22px]"
                  style={{ background: 'color-mix(in srgb, var(--brand) 14%, transparent)', color: 'var(--brand)' }}><I /></div>
                <h3 className="font-serif text-lg text-white mb-2">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{f.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* CTA / REGISTRO */}
      <section className="py-24 px-6 text-center" style={{ background: 'var(--bg2)' }}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="max-w-3xl mx-auto parchment-card rounded-3xl p-12">
          <div className="text-5xl mb-6" style={{ color: 'var(--brand)' }}><Archive /></div>
          <h2 className="font-serif text-4xl text-white mb-4">¿Listo para preservar<br /><span className="gold-text">el legado de tu iglesia?</span></h2>
          <p className="mb-8 leading-relaxed" style={{ color: 'var(--muted)' }}>
            Crea tu cuenta gratis o entra directo a la demo para recorrer los modos Público, Usuario y Admin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="px-10 py-4 rounded-full font-bold text-white text-lg brand-grad">
                Crear cuenta — Es Gratis
              </motion.button>
            </Link>
            <a href="/api/demo?to=/app">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="px-10 py-4 rounded-full font-semibold" style={{ color: 'var(--brand)', border: '1.5px solid var(--brand)' }}>
                Explorar Demo
              </motion.button>
            </a>
          </div>
        </motion.div>
      </section>

      <footer className="py-8 text-center text-sm" style={{ borderTop: '1px solid var(--border)', color: 'var(--muted)' }}>
        <p className="gold-text font-serif text-lg mb-1">ICIPAR</p>
        <p>Preservando el legado espiritual de México © 2025</p>
        <p className="mt-1 text-xs">Desarrollado por V Momentum · vmomentums.info</p>
      </footer>
    </>
  )
}
