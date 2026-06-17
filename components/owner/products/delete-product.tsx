'use client'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

import { deleteOwnerProduct } from '@/services/owner/product-owner.service'

import { Product } from '@/types/products.type'

import { useState } from 'react'
import Swal, { SweetAlertOptions } from 'sweetalert2'

const fireSwal = (options: SweetAlertOptions) =>
  new Promise<Awaited<ReturnType<typeof Swal.fire>>>((resolve) => {
    setTimeout(() => resolve(Swal.fire(options)), 300)
  })
type Props = {
  product: Product
  onSuccessAction?: () => Promise<void>
}

export const DeleteProductOwnerDialog = ({
  product,
  onSuccessAction,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    const result = await fireSwal({
      title: '¿Estás segura?',
      text: `Se eliminará el producto "${product.name}"`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc2626',
      theme: 'auto',
    })

    if (!result.isConfirmed) return

    try {
      setIsLoading(true)
      await deleteOwnerProduct(product.id)

      await onSuccessAction?.()
      await fireSwal({
        title: 'Eliminado',
        text: 'El producto fue eliminado correctamente',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
        theme: 'auto',
      })
    } catch {
      await fireSwal({
        title: 'Error',
        text: 'Ocurrió un error al eliminar el producto',
        icon: 'error',
        timer: 2000,
        showConfirmButton: false,
        theme: 'auto',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DropdownMenuItem
      onClick={handleDelete}
      disabled={isLoading}
      className='text-red-600'
    >
      {isLoading ? 'Eliminando...' : 'Eliminar'}
    </DropdownMenuItem>
  )
}
