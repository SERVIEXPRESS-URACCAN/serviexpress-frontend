'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Bike, Store, Clock } from 'lucide-react'

import { getOwnerApplications } from '@/services/owner.service'
import { getSolicitudMandadero } from '@/services/mandadero.service'

export default function SolicitudesPage() {
  const [ownerCount, setOwnerCount] = useState(0)
  const [mandaderoCount, setMandaderoCount] = useState(0)

  useEffect(() => {
    let cancel = false

    const fetchSolicitudes = async () => {
      try {
        const [owners, mandaderos] = await Promise.all([
          getOwnerApplications(1, 'PENDING'),
          getSolicitudMandadero(1),
        ])

        if (!cancel) {
          setOwnerCount(owners.pagination.total)
          setMandaderoCount(mandaderos.pagination.total)
        }
      } catch (error) {
        console.error('Error obteniendo solicitudes:', error)
      }
    }

    fetchSolicitudes()

    window.addEventListener('focus', fetchSolicitudes)

    return () => {
      cancel = true
      window.removeEventListener('focus', fetchSolicitudes)
    }
  }, [])

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-2xl font-bold'>Solicitudes</h1>
        <p className='text-sm text-muted-foreground'>
          Administra las solicitudes de registro de mandaderos y propietarios.
        </p>
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        <Link
          href='/admin/solicitudes/mandaderos'
          className='rounded-xl border p-6 transition-colors hover:bg-muted'
        >
          <div className='flex items-start justify-between'>
            <Bike className='h-8 w-8' />

            {mandaderoCount > 0 && (
              <span className='flex h-7 min-w-7 items-center justify-center rounded-full bg-orange-600 px-2 text-sm font-semibold text-white'>
                {mandaderoCount > 99 ? '99+' : mandaderoCount}
              </span>
            )}
          </div>

          <h2 className='mt-4 text-lg font-semibold'>
            Solicitudes de mandaderos
          </h2>

          <p className='mt-2 text-sm text-muted-foreground'>
            Revisa los documentos y administra las solicitudes de mandaderos.
          </p>

          <div className='mt-5 flex items-center gap-2 text-sm font-medium text-muted-foreground'>
            <Clock className='h-4 w-4' />
            {mandaderoCount} solicitudes pendientes
          </div>
        </Link>

        <Link
          href='/admin/solicitudes/propietarios'
          className='rounded-xl border p-6 transition-colors hover:bg-muted'
        >
          <div className='flex items-start justify-between'>
            <Store className='h-8 w-8' />

            {ownerCount > 0 && (
              <span className='flex h-7 min-w-7 items-center justify-center rounded-full bg-orange-600 px-2 text-sm font-semibold text-white'>
                {ownerCount > 99 ? '99+' : ownerCount}
              </span>
            )}
          </div>

          <h2 className='mt-4 text-lg font-semibold'>
            Solicitudes de propietarios
          </h2>

          <p className='mt-2 text-sm text-muted-foreground'>
            Revisa y administra las solicitudes de registro de propietarios.
          </p>

          <div className='mt-5 flex items-center gap-2 text-sm font-medium text-muted-foreground'>
            <Clock className='h-4 w-4' />
            {ownerCount} solicitudes pendientes
          </div>
        </Link>
      </div>
    </div>
  )
}
