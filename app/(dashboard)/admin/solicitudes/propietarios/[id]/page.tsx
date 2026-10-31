'use client'

import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useOwner } from '@/hooks/owner/useOwner'
import { SolicitudOwnerDocuments } from '@/components/admin/solicitudes-owner/details/solicitudes-owner-documents'
import { SolicitudOwnerActions } from '@/components/admin/solicitudes-owner/details/solicitud-owner-action'
import Link from 'next/link'

export default function OwnerApplicationDetailPage() {
  const params = useParams()
  const router = useRouter()

  const id = Number(params.id)
  const { owner, loading, error } = useOwner(id)

  if (loading) {
    return <p>Cargando información del propietario...</p>
  }

  if (error || !owner) {
    return (
      <div className='space-y-4'>
        <p className='text-destructive'>
          {error?.message || 'No se encontró la solicitud.'}
        </p>

        <Button
          variant='outline'
          onClick={() => router.push('/admin/solicitudes/propietarios')}
        >
          Volver a solicitudes
        </Button>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-3'>
        <Button variant='ghost' asChild>
          <Link href='/admin/solicitudes/propietarios'>
            <ArrowLeft className='size-4' />
          </Link>
        </Button>

        <div>
          <h1 className='text-2xl font-bold'>
            Detalle de solicitud de propietario
          </h1>
          <p className='text-sm text-muted-foreground'>Solicitud #{owner.id}</p>
        </div>
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        <div className='rounded-lg border p-5 space-y-4'>
          <h2 className='text-lg font-semibold'>Datos personales</h2>

          <div>
            <p className='text-sm text-muted-foreground'>Nombre completo</p>
            <p className='font-medium'>
              {owner.user?.profile?.name ?? 'Sin nombre'}{' '}
              {owner.user?.profile?.lastName ?? ''}
            </p>
          </div>

          <div>
            <p className='text-sm text-muted-foreground'>Correo electrónico</p>
            <p className='font-medium'>{owner.user?.email ?? 'Sin correo'}</p>
          </div>

          <div>
            <p className='text-sm text-muted-foreground'>Teléfono</p>
            <p className='font-medium'>
              {owner.user?.profile?.cellphone ?? 'Sin teléfono'}
            </p>
          </div>
        </div>

        <div className='rounded-lg border p-5 space-y-4'>
          <h2 className='text-lg font-semibold'>Datos del negocio</h2>

          <div>
            <p className='text-sm text-muted-foreground'>Nombre del negocio</p>
            <p className='font-medium'>
              {owner.business?.name ?? 'Sin negocio'}
            </p>
          </div>

          <div>
            <p className='text-sm text-muted-foreground'>Razón social</p>
            <p className='font-medium'>
              {owner.razonSocial ?? 'No especificada'}
            </p>
          </div>

          <div>
            <p className='text-sm text-muted-foreground'>Ciudad</p>
            <p className='font-medium'>
              {owner.business?.city?.name ?? 'Sin ciudad'}
            </p>
          </div>
        </div>
      </div>

      <SolicitudOwnerDocuments owner={owner} />

      {owner.status === 'PENDING' && <SolicitudOwnerActions id={owner.id} />}
    </div>
  )
}
