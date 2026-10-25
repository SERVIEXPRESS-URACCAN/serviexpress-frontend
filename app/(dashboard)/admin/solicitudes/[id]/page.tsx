'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { getMandaderoById } from '@/services/mandadero.service'
import type { Mandadero } from '@/types/mandadero.type'

import { Button } from '@/components/ui/button'
import { SolicitudActions } from '@/components/admin/solicitudes/details/solicitud-actions'
import { SolicitudDocuments } from '@/components/admin/solicitudes/details/solicitud-documents'

export default function DetalleSolicitudPage() {
  const params = useParams()
  const id = Number(params.id)

  const [mandadero, setMandadero] = useState<Mandadero | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!Number.isFinite(id) || id <= 0) {
      return
    }

    let cancel = false

    async function cargarDetalle() {
      try {
        const respuesta = await getMandaderoById(id)

        if (!cancel) {
          setMandadero(respuesta)
        }
      } catch (error: unknown) {
        if (!cancel) {
          setError(
            error instanceof Error
              ? error.message
              : 'Error al cargar los detalles',
          )
        }
      } finally {
        if (!cancel) {
          setLoading(false)
        }
      }
    }

    cargarDetalle()

    return () => {
      cancel = true
    }
  }, [id])

  if (!Number.isFinite(id) || id <= 0) {
    return <p>Error: ID de solicitud no válido</p>
  }

  if (loading) {
    return <p>Cargando detalles</p>
  }

  if (error) {
    return <p className='text-destructive'>Error: {error}</p>
  }

  if (!mandadero) {
    return <p>No se encontró la solicitud.</p>
  }

  return (
    <div className='w-full space-y-6'>
      <div className='flex items-center gap-3'>
        <Button variant='ghost' asChild>
          <Link href='/admin/solicitudes'>
            <ArrowLeft className='size-4' />
          </Link>
        </Button>

        <h2 className='text-xl font-semibold'>Documentos del solicitante</h2>
      </div>

      <SolicitudDocuments mandadero={mandadero} />

      <SolicitudActions id={id} />
    </div>
  )
}
