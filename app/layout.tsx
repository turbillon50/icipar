import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ICIPAR — Biblioteca Histórica de Iglesias Cristianas',
  description: 'Archivo digital histórico de iglesias cristianas en México. Preserva, documenta y comparte el legado de tu congregación.',
  manifest: '/manifest.json',
  themeColor: '#C9A84C',
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: 'ICIPAR' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/icon.png" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
