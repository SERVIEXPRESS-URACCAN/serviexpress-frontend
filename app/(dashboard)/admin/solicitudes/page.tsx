'use client'

import { useSolicitudesMandadero } from '@/hooks/useSolicitudesMandaderos'
import { SolicitudesTable } from '@/components/admin/solicitudes/solicitudes-table'
import Loading from './loading'

export default function SolicitudesPage() {
  const { solicitudes, loading, error } = useSolicitudesMandadero()

  if (loading || !solicitudes) {
    return <Loading />
  }

  if (error) {
    return <p className='text-destructive'>Error: {error.message}</p>
  }

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-2xl font-bold'>Solicitudes de mandaderos</h1>
        <p className='text-sm text-muted-foreground'>
          Revisa las solicitudes pendientes de aprobación.
        </p>
      </div>

      <SolicitudesTable
        solicitudes={solicitudes}
        currentPage={solicitudes.pagination.page}
      />
    </div>
  )
}
