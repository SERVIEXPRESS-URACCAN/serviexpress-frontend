'use client'

import { useSolicitudesMandadero } from '@/hooks/useSolicitudesMandaderos'
import { SolicitudesTable } from '@/components/admin/solicitudes/solicitudes-table'
import Loading from '../loading'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

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
      <div className='flex items-center gap-3'>
        <Button variant='ghost' asChild>
          <Link href='/admin/solicitudes'>
            <ArrowLeft className='size-4' />
          </Link>
        </Button>
        <h1 className='text-2xl font-bold'>Solicitudes de mandaderos</h1>
      </div>

      <SolicitudesTable
        solicitudes={solicitudes}
        currentPage={solicitudes.pagination.page}
      />
    </div>
  )
}
