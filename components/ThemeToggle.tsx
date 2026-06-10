'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon } from '@/components/Icon'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  useEffect(() => {
    const saved = (typeof window !== 'undefined' && localStorage.getItem('icipar-theme')) as 'dark' | 'light' | null
    const initial = saved || 'dark'
    setTheme(initial)
    document.documentElement.setAttribute('data-theme', initial)
  }, [])
  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    try { localStorage.setItem('icipar-theme', next) } catch {}
  }
  return (
    <motion.button onClick={toggle} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
      aria-label="Cambiar tema" title={theme === 'dark' ? 'Modo día' : 'Modo noche'}
      className="theme-toggle flex items-center justify-center w-11 h-11 rounded-full glass-card shadow-lg text-[20px]"
      style={{ color: 'var(--brand)' }}>
      {theme === 'dark' ? <Sun /> : <Moon />}
    </motion.button>
  )
}
