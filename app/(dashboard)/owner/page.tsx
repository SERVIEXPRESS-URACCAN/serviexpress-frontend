import { auth } from '@/auth'
import StatsCard from '@/components/propietario/owner-stats-card'
import PageHeader from '@/components/propietario/page-header'
import { isOwner } from '@/lib/permissions'
import { redirect } from 'next/navigation'

export default async function OwnerPage() {
  const session = await auth()
  if (!session) redirect('/login')
  if (!isOwner(session.user.roles)) redirect('/not-found')

  return (
    <div>
      <PageHeader
        title="Dashboard negocio"
        description="Resumen general del sistema"
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard title="Productos" value="120" />

        <StatsCard title="Pedidos" value="58" />

        <StatsCard title="Negocios" value="12" />

        <StatsCard title="Ingresos" value="$2,340" />
      </div>
    </div>
  )
}
