'use client'

import { useState } from 'react'
import Swal, { SweetAlertOptions } from 'sweetalert2'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Clients } from '@/types/clients'
import { deleteClient } from '@/services/clients.service'

const fireSwal = (options: SweetAlertOptions) =>
  new Promise<Awaited<ReturnType<typeof Swal.fire>>>((resolve) => {
    setTimeout(() => resolve(Swal.fire(options)), 300)
  })

type Props = {
  client: Clients,
  onUpdatedAction: () => Promise<void>
}

export const DeleteClientDialog = ({
  client,
  onUpdatedAction,
}: Props) => {

  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    const result = await fireSwal({
      title: '¿Estás segura?',
      text: `Se eliminará el cliente "${client.name}"`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc2626',
      theme: 'auto'
    })

    if (!result.isConfirmed) return

    try {
      setIsLoading(true)

      await deleteClient(
        client.user.id,
      )
      await onUpdatedAction()

      await fireSwal({
        title: 'Eliminado',
        text: 'El Cliente fue eliminado correctamente',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
        theme: 'auto'
      })
    } catch {
      await fireSwal({
        title: 'Error',
        text: 'No se pudo eliminar el cliente',
        icon: 'error',
        theme: 'auto'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DropdownMenuItem
      onClick={handleDelete}
      disabled={isLoading}
      className="text-red-500 focus:text-red-500"
    >
      {isLoading ? 'Eliminando...' : 'Eliminar'}
    </DropdownMenuItem>
  )
}