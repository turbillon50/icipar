'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Globe, User, Shield, ChevronUp } from '@/components/Icon'

type Mode = 'public' | 'user' | 'admin'
interface Props { currentMode: Mode }

const MODES = [
  { id: 'public' as Mode, label: 'Público', Icon: Globe, href: '/', color: '#7E6BE0' },
  { id: 'user' as Mode, label: 'Usuario', Icon: User, href: '/app', color: '#5B47C7' },
  { id: 'admin' as Mode, label: 'Admin', Icon: Shield, href: '/admin', color: '#E07A5F' },
]

export default function ModeSwitcher({ currentMode }: Props) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const current = MODES.find(m => m.id === currentMode)!
  const CurIcon = current.Icon
  return (
    <div className="mode-switcher">
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 10, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }} className="mb-3 flex flex-col gap-2">
            {MODES.filter(m => m.id !== currentMode).map(m => {
              const I = m.Icon
              return (
                <motion.button key={m.id} whileHover={{ scale: 1.05, x: -2 }} whileTap={{ scale: 0.95 }}
                  onClick={() => { router.push(m.href); setOpen(false) }}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl glass-card text-sm font-medium shadow-lg text-[16px]"
                  style={{ color: m.color }}>
                  <I /> Modo {m.label}
                </motion.button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-3 rounded-2xl shadow-xl font-medium text-sm glass-card text-[16px]"
        style={{ border: `1px solid ${current.color}55`, color: current.color }}>
        <CurIcon /> {current.label}
        <motion.span animate={{ rotate: open ? 180 : 0 }} className="text-[12px]"><ChevronUp /></motion.span>
      </motion.button>
    </div>
  )
}
