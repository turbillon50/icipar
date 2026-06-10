import Navbar from '@/components/Navbar'
import ModeSwitcher from '@/components/ModeSwitcher'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar variant="app" />
      <ModeSwitcher currentMode="user" />
      <main className="pt-20">{children}</main>
    </>
  )
}
