import type { Metadata } from 'next'
import './globals.css'
import ThemeToggle from '@/components/ThemeToggle'

export const metadata: Metadata = {
  title: 'ICIPAR — Biblioteca Histórica de Iglesias Cristianas',
  description: 'Archivo digital histórico de iglesias cristianas en México. Preserva, documenta y comparte el legado de tu congregación.',
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: 'ICIPAR' },
}
export const viewport = { themeColor: '#5B47C7' }

const noFlash = `(function(){try{var t=localStorage.getItem('icipar-theme')||'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-theme="dark">
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlash }} />
        <link rel="icon" href="/icon.png" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="antialiased">
        <ThemeToggle />
        {children}
      </body>
    </html>
  )
}
