'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  aprobarSolicitudMandadero,
  rechazarSolicitudMandadero,
} from '@/services/mandadero.service'
import Swal from 'sweetalert2'

type Props = {
  id: number
}

export const SolicitudActions = ({ id }: Props) => {
  const router = useRouter()
  const [processing, setProcessing] = useState(false)

  async function ejecutarAccion(accion: 'aprobar' | 'rechazar') {
    try {
      setProcessing(true)

      if (accion === 'aprobar') {
        await aprobarSolicitudMandadero(id)

        await Swal.fire({
          icon: 'success',
          title: 'Solicitud aprobada',
          text: 'La solicitud del mandadero fue aprobada exitosamente.',
          timer: 2000,
          showConfirmButton: false,
        })
      } else {
        await rechazarSolicitudMandadero(id)

        await Swal.fire({
          icon: 'success',
          title: 'Solicitud rechazada',
          text: 'La solicitud del mandadero fue rechazada correctamente.',
          timer: 2000,
          showConfirmButton: false,
        })
      }

      router.push('/admin/solicitudes')
    } catch (error: unknown) {
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text:
          error instanceof Error
            ? error.message
            : accion === 'aprobar'
              ? 'Error al aprobar la solicitud.'
              : 'Error al rechazar la solicitud.',
        confirmButtonText: 'Aceptar',
      })
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className='flex justify-end gap-3'>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant='destructive'
            disabled={processing}
            className='h-12 px-8 text-base font-semibold'
          >
            Rechazar solicitud
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Rechazar esta solicitud?</AlertDialogTitle>
            <AlertDialogDescription>
              La solicitud del mandadero será rechazada. ¿Deseas continuar?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => ejecutarAccion('rechazar')}
              disabled={processing}
              className='bg-destructive text-white hover:bg-destructive/90'
            >
              {processing ? 'Procesando...' : 'Sí, rechazar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            disabled={processing}
            className='h-12 px-8 text-base font-semibold'
          >
            Aprobar solicitud
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Aprobar esta solicitud?</AlertDialogTitle>
            <AlertDialogDescription>
              Confirma que has revisado los documentos y deseas aprobar la
              solicitud.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => ejecutarAccion('aprobar')}
              disabled={processing}
            >
              {processing ? 'Procesando...' : 'Sí, aprobar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
