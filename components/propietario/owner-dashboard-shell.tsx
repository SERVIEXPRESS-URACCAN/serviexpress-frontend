import OwnerNavbar from './navbar'
import OwnerSidebar from './sidebar'

export default function OwnerDashboardShell({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-black">
      <OwnerSidebar />

      <div className="flex flex-1 flex-col">
        <OwnerNavbar />

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
