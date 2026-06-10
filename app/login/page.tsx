'use client'
import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Cross, ChevronRight, ArrowLeft } from '@/components/Icon'

function LoginInner() {
  const params = useSearchParams()
  const to = params.get('to') || '/app'
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', church: '' })
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('/images/hero.jpg')" }} />
      <div className="absolute inset-0 -z-10 hero-overlay" />
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-card rounded-3xl p-8 shadow-2xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm mb-6" style={{ color: 'var(--muted)' }}>
          <ArrowLeft /> Volver al inicio
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl" style={{ color: 'var(--brand)' }}><Cross /></span>
          <span className="font-serif text-2xl gold-text font-bold">ICIPAR</span>
        </div>
        <h1 className="font-serif text-2xl mb-1 text-white">Crea tu cuenta</h1>
        <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>Registra tu congregación y empieza a preservar su legado.</p>
        {sent ? (
          <div className="rounded-2xl p-4 mb-5 text-sm" style={{ background: 'color-mix(in srgb, var(--brand) 12%, transparent)', color: 'var(--ink)' }}>
            ¡Gracias, {form.name || 'amig@'}! Tu registro quedó guardado. Mientras activamos tu cuenta, explora la demo completa.
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="space-y-3 mb-5">
            <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Tu nombre" className="w-full px-4 py-3 rounded-xl bg-transparent text-white outline-none" style={{ border: '1px solid var(--border)' }} />
            <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="Correo electrónico" className="w-full px-4 py-3 rounded-xl bg-transparent text-white outline-none" style={{ border: '1px solid var(--border)' }} />
            <input value={form.church} onChange={e => setForm({ ...form, church: e.target.value })}
              placeholder="Nombre de tu iglesia (opcional)" className="w-full px-4 py-3 rounded-xl bg-transparent text-white outline-none" style={{ border: '1px solid var(--border)' }} />
            <button type="submit" className="w-full px-6 py-3 rounded-xl font-semibold text-white brand-grad shadow-lg">Registrarme</button>
          </form>
        )}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          <span className="text-xs" style={{ color: 'var(--muted)' }}>o</span>
          <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
        </div>
        <a href={`/api/demo?to=${encodeURIComponent(to)}`}>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="w-full px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2"
            style={{ border: '1.5px solid var(--brand)', color: 'var(--brand)' }}>
            Explorar demo — sin registro <ChevronRight />
          </motion.button>
        </a>
        <p className="text-center text-xs mt-4" style={{ color: 'var(--muted)' }}>Recorre los modos Público, Usuario y Admin con datos de ejemplo.</p>
      </motion.div>
    </main>
  )
}

export default function LoginPage() {
  return (<Suspense fallback={<main className="min-h-screen" />}><LoginInner /></Suspense>)
}
