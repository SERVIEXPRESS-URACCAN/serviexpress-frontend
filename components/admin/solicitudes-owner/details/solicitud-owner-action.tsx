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
  approveOwnerApplication,
  rejectOwnerApplication,
} from '@/services/owner.service'
import Swal from 'sweetalert2'

type Props = {
  id: number
}

export const SolicitudOwnerActions = ({ id }: Props) => {
  const router = useRouter()
  const [processing, setProcessing] = useState(false)

  async function ejecutarAccion(accion: 'aprobar' | 'rechazar') {
    try {
      setProcessing(true)

      if (accion === 'aprobar') {
        await approveOwnerApplication(id)

        await Swal.fire({
          icon: 'success',
          title: 'Solicitud aprobada',
          text: 'La solicitud del propietario fue aprobada exitosamente.',
          timer: 2000,
          showConfirmButton: false,
        })
      } else {
        await rejectOwnerApplication(id)

        await Swal.fire({
          icon: 'success',
          title: 'Solicitud rechazada',
          text: 'La solicitud del propietario fue rechazada correctamente.',
          timer: 2000,
          showConfirmButton: false,
        })
      }

      router.push('/admin/solicitudes/propietarios')
    } catch (error: unknown) {
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text:
          error instanceof Error
            ? error.message
            : 'No se pudo procesar la solicitud.',
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
              La solicitud del propietario será rechazada. ¿Deseas continuar?
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
              Confirma que has revisado los datos y deseas aprobar la solicitud.
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
