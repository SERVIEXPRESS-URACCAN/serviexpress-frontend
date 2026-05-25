'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Swal, { SweetAlertOptions } from 'sweetalert2'


import { CategoryProduct } from '@/types/categories-products'
import { deleteCategoryProduct } from '@/services/categories-products.service'
import { useAuth } from '@/hooks/useAuth'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

const fireSwal = (options: SweetAlertOptions) =>
  new Promise<Awaited<ReturnType<typeof Swal.fire>>>((resolve) => {
    setTimeout(() => resolve(Swal.fire(options)), 300)
  })

type Props = {
  categoryProduct: CategoryProduct
}

export const DeleteCategoryProductDialog = ({
  categoryProduct
}: Props) => {
  const router = useRouter()
  const { session } = useAuth()

  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    const result = await fireSwal({
      title: '¿Estás segura?',
      text: `Se eliminará la categoría "${categoryProduct.name}"`,
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

      await deleteCategoryProduct(
        categoryProduct.id,
        session!.accessToken
      )

      router.refresh()

      await fireSwal({
        title: 'Eliminado',
        text: 'La categoría fue eliminada correctamente',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
        theme: 'auto'
      })
    } catch {
      await fireSwal({
        title: 'Error',
        text: 'No se pudo eliminar la categoría',
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
)}