'use client'
import * as React from 'react'

type P = { className?: string; style?: React.CSSProperties; strokeWidth?: number }

function I({ className, style, strokeWidth, children }: P & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={strokeWidth ?? 2} strokeLinecap="round" strokeLinejoin="round"
      className={className} style={{ width: '1em', height: '1em', ...style }} aria-hidden="true">
      {children}
    </svg>
  )
}

export const Church = (p: P) => <I {...p}><path d="M12 2v6" /><path d="M9 5h6" /><path d="M12 8 5 12v9h14v-9z" /><path d="M9 21v-5h6v5" /></I>
export const Archive = (p: P) => <I {...p}><rect x="3" y="4" width="18" height="4" rx="1" /><path d="M5 8v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8" /><path d="M10 12h4" /></I>
export const BookOpen = (p: P) => <I {...p}><path d="M12 7v14" /><path d="M3 18V5a1 1 0 0 1 1-1h5a3 3 0 0 1 3 3 3 3 0 0 1 3-3h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a2 2 0 0 0-2 2 2 2 0 0 0-2-2H4a1 1 0 0 1-1-1z" /></I>
export const Search = (p: P) => <I {...p}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></I>
export const Clock = (p: P) => <I {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></I>
export const Star = (p: P) => <I {...p}><path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.8 6.8 19.2l1-5.8-4.3-4.1 5.9-.9z" /></I>
export const Download = (p: P) => <I {...p}><path d="M12 3v12" /><path d="m7 11 5 5 5-5" /><path d="M5 21h14" /></I>
export const ChevronRight = (p: P) => <I {...p}><path d="m9 6 6 6-6 6" /></I>
export const ChevronUp = (p: P) => <I {...p}><path d="m6 15 6-6 6 6" /></I>
export const ArrowLeft = (p: P) => <I {...p}><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></I>
export const Calendar = (p: P) => <I {...p}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4" /></I>
export const Database = (p: P) => <I {...p}><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" /><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></I>
export const Edit = (p: P) => <I {...p}><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></I>
export const Eye = (p: P) => <I {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></I>
export const Globe = (p: P) => <I {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" /></I>
export const MapPin = (p: P) => <I {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></I>
export const Menu = (p: P) => <I {...p}><path d="M4 6h16M4 12h16M4 18h16" /></I>
export const X = (p: P) => <I {...p}><path d="M6 6l12 12M18 6 6 18" /></I>
export const MessageSquare = (p: P) => <I {...p}><path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></I>
export const Plus = (p: P) => <I {...p}><path d="M12 5v14M5 12h14" /></I>
export const Settings = (p: P) => <I {...p}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8 2 2 0 1 1-2.8 2.8 1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0 1.6 1.6 0 0 0-2.6-1.1 2 2 0 1 1-2.8-2.8A1.6 1.6 0 0 0 3 12.5a2 2 0 1 1 0-4 1.6 1.6 0 0 0 1.7-2.6 2 2 0 1 1 2.8-2.8A1.6 1.6 0 0 0 10.5 3.4a2 2 0 1 1 4 0 1.6 1.6 0 0 0 2.7 1.1 2 2 0 1 1 2.8 2.8 1.6 1.6 0 0 0-.3 1.8 1.6 1.6 0 0 0 1.5 1h.1a2 2 0 1 1 0 4z" /></I>
export const Shield = (p: P) => <I {...p}><path d="M12 3 5 6v5c0 4.5 3 7.6 7 9 4-1.4 7-4.5 7-9V6z" /></I>
export const Tag = (p: P) => <I {...p}><path d="M3 3h7l11 11-7 7L3 10z" /><circle cx="7.5" cy="7.5" r="1.2" /></I>
export const Trash2 = (p: P) => <I {...p}><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" /></I>
export const TrendingUp = (p: P) => <I {...p}><path d="m3 17 6-6 4 4 8-8" /><path d="M15 7h6v6" /></I>
export const User = (p: P) => <I {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></I>
export const Users = (p: P) => <I {...p}><circle cx="9" cy="8" r="3.5" /><path d="M2 21a7 7 0 0 1 14 0" /><path d="M16 4.5a3.5 3.5 0 0 1 0 7M22 21a7 7 0 0 0-5-6.7" /></I>
export const Sun = (p: P) => <I {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></I>
export const Moon = (p: P) => <I {...p}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></I>
export const Cross = (p: P) => <I {...p}><path d="M10 3h4v6h6v4h-6v8h-4v-8H4V9h6z" /></I>
