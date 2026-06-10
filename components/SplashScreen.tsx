'use client'
import { motion } from 'framer-motion'


export default function SplashScreen() {
  return (
    <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: 'var(--bg)' }}>
      <div className="absolute top-0 left-0 right-0 h-px shimmer-gold" />
      <motion.div initial={{ scale: 0.3, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        className="mb-6"><img src="/logo.png" alt="ICIPAR" className="w-28 h-28 rounded-full object-cover shadow-2xl" /></motion.div>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }} className="font-serif text-5xl gold-text font-bold mb-3">ICIPAR</motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
        className="text-sm font-serif italic" style={{ color: 'var(--muted)' }}>Biblioteca Histórica de Iglesias Cristianas</motion.p>
      <motion.div className="mt-12 w-48 h-px overflow-hidden rounded-full" style={{ background: 'var(--border)' }}>
        <motion.div initial={{ width: '0%' }} animate={{ width: '100%' }}
          transition={{ delay: 0.5, duration: 1.8, ease: 'easeInOut' }} className="h-full brand-grad" />
      </motion.div>
      <div className="absolute bottom-0 left-0 right-0 h-px shimmer-gold" />
    </motion.div>
  )
}
