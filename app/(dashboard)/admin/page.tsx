import PageHeader from '@/components/admin/page-header'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { isAdmin } from '@/lib/permissions'
import DashboardStats from './dashboard-stats'

export default async function AdminPage() {
  const session = await auth()

  if (!session) redirect('/login')

  if (!isAdmin(session.user.roles)) {
    redirect('/not-found')
  }

  return (
    <div>
      <PageHeader title='Dashboard' description='Resumen general del sistema' />

      <DashboardStats />
    </div>
  )
}
