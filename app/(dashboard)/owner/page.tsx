import { auth } from '@/auth'
import PageHeader from '@/components/propietario/page-header'
import { isOwner } from '@/lib/permissions'
import { redirect } from 'next/navigation'
import OwnerDashboardStats from './owner-dashboard-stats'

export default async function OwnerPage() {
  const session = await auth()
  if (!session) redirect('/login')
  if (!isOwner(session.user.roles)) redirect('/not-found')

  return (
    <div>
      <PageHeader
        title='Dashboard negocio'
        description='Resumen general del sistema'
      />

      <div className='space-y-6'>
        <OwnerDashboardStats />
      </div>
    </div>
  )
}
