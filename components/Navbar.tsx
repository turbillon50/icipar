'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Menu, X, Cross } from '@/components/Icon'

interface Props { variant?: 'app' | 'admin' }
const APP_LINKS = [
  { href: '/app', label: 'Inicio' },
  { href: '/app/churches', label: 'Iglesias' },
  { href: '/app/timeline', label: 'Línea de Tiempo' },
  { href: '/app/search', label: 'Buscar' },
]
const ADMIN_LINKS = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/churches', label: 'Iglesias' },
  { href: '/admin/events', label: 'Eventos' },
  { href: '/admin/testimonies', label: 'Testimonios' },
]

export default function Navbar({ variant = 'app' }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const links = variant === 'admin' ? ADMIN_LINKS : APP_LINKS
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <motion.nav initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3 glass-card' : 'py-5 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href={variant === 'admin' ? '/admin' : '/app'} className="flex items-center gap-3">
          <span className="text-xl" style={{ color: 'var(--brand)' }}><Cross /></span>
          <span className="font-serif text-xl gold-text font-bold">ICIPAR</span>
          {variant === 'admin' && (
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ color: 'var(--accent)', border: '1px solid color-mix(in srgb,var(--accent) 40%,transparent)' }}>Admin</span>
          )}
        </Link>
        <div className="hidden md:flex items-center gap-8 pr-14">
          {links.map(l => (
            <Link key={l.href} href={l.href}
              className={`text-sm transition-colors ${pathname === l.href ? 'text-amber-400' : 'text-stone-400 hover:text-white'}`}>{l.label}</Link>
          ))}
          <Link href="/" className="text-sm text-stone-400 hover:text-white">↩ Web</Link>
        </div>
        <button className="md:hidden text-stone-400 text-2xl" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden glass-card mt-2 mx-4 rounded-2xl overflow-hidden">
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="block px-6 py-3 text-stone-300 hover:text-amber-400 transition-colors text-sm">{l.label}</Link>
          ))}
          <Link href="/" onClick={() => setOpen(false)} className="block px-6 py-3 text-stone-300 text-sm">↩ Volver a la web</Link>
        </motion.div>
      )}
    </motion.nav>
  )
}
