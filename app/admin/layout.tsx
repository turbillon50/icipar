import Navbar from '@/components/Navbar'
import ModeSwitcher from '@/components/ModeSwitcher'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar variant="admin" />
      <ModeSwitcher currentMode="admin" />
      <main className="pt-20">{children}</main>
    </>
  )
}
