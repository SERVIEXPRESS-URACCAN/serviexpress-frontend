'use client'

import { useState } from 'react'
import Swal, { SweetAlertOptions } from 'sweetalert2'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

import {
  CategoryProduct,
  UpdateCategoryProductDto
} from '@/types/categories-products'

import {
  restoreCategoryProduct,
  updateCategoryProduct
} from '@/services/categories-products.service'

import { CategoryConflictException } from '@/types/api-errors.types'

import { CategoryProductForm } from './categories-products-form'

const fireSwal = (options: SweetAlertOptions) =>
  new Promise<Awaited<ReturnType<typeof Swal.fire>>>((resolve) => {
    setTimeout(() => resolve(Swal.fire(options)), 300)
  })

type Props = {
  categoryProduct: CategoryProduct
  open: boolean
  onOpenChangeAction: (open: boolean) => void
  refreshAction?: () => Promise<void>
}

export const EditCategoryProductDialog = ({
  categoryProduct,
  open,
  onOpenChangeAction,
  refreshAction
}: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const handleConflict = async (error: CategoryConflictException) => {
    if (!error.data.canRestore) {
      setServerError(error.message)
      return
    }

    const result = await fireSwal({
      icon: 'question',
      title: '¿Restaurar categoría?',
      text: error.data.message,
      showCancelButton: true,
      confirmButtonText: 'Sí, restaurar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#16a34a',
      cancelButtonColor: '#dc2626',
      theme: 'auto'
    })

    if (!result.isConfirmed) return

    try {
      await restoreCategoryProduct(error.data.id)

      await refreshAction?.()
      await fireSwal({
        icon: 'success',
        title: 'Categoría restaurada',
        timer: 2000,
        showConfirmButton: false,
        theme: 'auto'
      })
    } catch (restoreError) {
      const message =
        restoreError instanceof Error
          ? restoreError.message
          : 'Error al restaurar la categoría'

      await fireSwal({
        icon: 'error',
        title: 'Error',
        text: message,
        theme: 'auto'
      })
    }
  }

  const handleUpdate = async (data: UpdateCategoryProductDto) => {
    try {
      setIsLoading(true)
      setServerError(null)

      await updateCategoryProduct(categoryProduct.id, data)

      onOpenChangeAction(false)

      await refreshAction?.()

      await fireSwal({
        icon: 'success',
        title: 'Categoría actualizada',
        text: `La categoría "${data.name}" fue actualizada exitosamente.`,
        timer: 2000,
        showConfirmButton: false,
        theme: 'auto'
      })
    } catch (error) {
      if (error instanceof CategoryConflictException) {
        await handleConflict(error)
        return
      }

      const message =
        error instanceof Error
          ? error.message
          : 'Error al actualizar la categoría'

      setServerError(message)

      await fireSwal({
        icon: 'error',
        title: 'Error',
        text: message,
        theme: 'auto'
      })
    } finally {
      setIsLoading(false)
    }
  }
  const handleOpenChange = (value: boolean) => {
    onOpenChangeAction(value)

    if (!value) {
      setServerError(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Editar categoría de producto</DialogTitle>
        </DialogHeader>

        <CategoryProductForm
          defaultValues={{
            name: categoryProduct.name
          }}
          onSubmitAction={handleUpdate}
          isLoading={isLoading}
          serverError={serverError}
        />
      </DialogContent>
    </Dialog>
  )
}
