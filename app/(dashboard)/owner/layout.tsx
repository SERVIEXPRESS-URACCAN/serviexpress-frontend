import OwnerDashboardShell from '@/components/propietario/owner-dashboard-shell'

export default function OwnerLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <OwnerDashboardShell>{children}</OwnerDashboardShell>
}
