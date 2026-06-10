'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Globe, User, Shield, ChevronUp } from 'lucide-react'

type Mode = 'public' | 'user' | 'admin'

interface Props { currentMode: Mode }

const MODES = [
  { id: 'public' as Mode, label: 'Público', icon: Globe, href: '/', color: '#A78BFA' },
  { id: 'user' as Mode, label: 'Usuario', icon: User, href: '/app', color: '#C9A84C' },
  { id: 'admin' as Mode, label: 'Admin', icon: Shield, href: '/admin', color: '#F87171' },
]

export default function ModeSwitcher({ currentMode }: Props) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const current = MODES.find(m => m.id === currentMode)!

  return (
    <div className="mode-switcher">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity:0, y:10, scale:0.9 }}
            animate={{ opacity:1, y:0, scale:1 }}
            exit={{ opacity:0, y:10, scale:0.9 }}
            className="mb-3 flex flex-col gap-2"
          >
            {MODES.filter(m => m.id !== currentMode).map(m => (
              <motion.button
                key={m.id}
                whileHover={{ scale:1.05, x:-2 }}
                whileTap={{ scale:0.95 }}
                onClick={() => { router.push(m.href); setOpen(false) }}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl glass-card text-sm font-medium shadow-lg"
                style={{ color: m.color }}
              >
                <m.icon className="w-4 h-4" />
                Modo {m.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale:1.05 }}
        whileTap={{ scale:0.95 }}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-3 rounded-2xl shadow-xl font-medium text-sm"
        style={{ background:'linear-gradient(135deg,#1C1917,#292524)', border:`1px solid ${current.color}40`, color: current.color }}
      >
        <current.icon className="w-4 h-4" />
        {current.label}
        <motion.div animate={{ rotate: open ? 180 : 0 }}>
          <ChevronUp className="w-3 h-3" />
        </motion.div>
      </motion.button>
    </div>
  )
}
