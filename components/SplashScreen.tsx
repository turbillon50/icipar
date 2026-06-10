'use client'
import { motion } from 'framer-motion'

export default function SplashScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: 'linear-gradient(180deg, #0C0A09 0%, #1a1108 50%, #0C0A09 100%)' }}
    >
      {/* Shimmer line */}
      <div className="absolute top-0 left-0 right-0 h-px shimmer-gold" />

      <motion.div
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.34,1.56,0.64,1] }}
        className="text-7xl mb-6"
      >✝</motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="font-serif text-5xl gold-text font-bold mb-3"
      >ICIPAR</motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-stone-400 text-sm font-serif italic"
      >Biblioteca Histórica de Iglesias Cristianas</motion.p>

      {/* Loading bar */}
      <motion.div className="mt-12 w-48 h-px bg-stone-800 overflow-hidden rounded-full">
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ delay: 0.5, duration: 1.8, ease: 'easeInOut' }}
          className="h-full"
          style={{ background: 'linear-gradient(90deg, #C9A84C, #E8C96D)' }}
        />
      </motion.div>

      {/* Bottom shimmer */}
      <div className="absolute bottom-0 left-0 right-0 h-px shimmer-gold" />
    </motion.div>
  )
}
