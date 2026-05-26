'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Swal, { SweetAlertOptions } from 'sweetalert2'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { CategoryProductForm } from './categories-products-form'
import { createCategoryProduct, restoreCategoryProduct } from '@/services/categories-products.service'
import { CategoryConflictException } from '@/types/api-errors.types'
import { useAuth } from '@/hooks/useAuth'

const fireSwal = (options: SweetAlertOptions) =>
  new Promise<Awaited<ReturnType<typeof Swal.fire>>>((resolve) => {
    setTimeout(() => resolve(Swal.fire(options)), 300)
  })

export const CreateCategoryProductDialog = () => {
  const router = useRouter()
  const { session } = useAuth()
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)


  const handleConflict = async (
    error: CategoryConflictException
  ) => {
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
    })

    if (!result.isConfirmed) return

    try {
      await restoreCategoryProduct(error.data.id, session!.accessToken)
      router.refresh()
      await fireSwal({
        icon: 'success',
        title: 'Categoría restaurada',
        timer: 2000,
        showConfirmButton: false,
      })
    } catch (restoreError) {
      const message = restoreError instanceof Error ? restoreError.message : 'Error al restaurar la categoría'
      await fireSwal({ icon: 'error', title: 'Error', text: message })
    }
  }

  const handleOpenChange = (value: boolean) => {
  setOpen(value)

  if (!value) {
    setServerError(null)
  }
}

  const handleCreate = async (data: { name: string }) => {
    try {
      setIsLoading(true)
      await createCategoryProduct(data, session!.accessToken)
      setOpen(false)
      router.refresh()
      await fireSwal({
        icon: 'success',
        title: 'Categoría creada',
        text: `La categoría "${data.name}" fue creada exitosamente.`,
        timer: 2000,
        showConfirmButton: false,
      })
    } catch (error) {
      if (error instanceof CategoryConflictException) {
        await handleConflict(error)
        return
      }

      const message =
        error instanceof Error
          ? error.message
          : 'Error al crear la categoría'

      await fireSwal({
        icon: 'error',
        title: 'Error',
        text: message
      })
  } finally {
    setIsLoading(false)
  }
}
return (
  <Dialog open={open} onOpenChange={handleOpenChange}>
    <DialogTrigger asChild>
      <Button>Nueva categoría de producto</Button>
    </DialogTrigger>
    <DialogContent aria-describedby={undefined}>
      <DialogHeader>
        <DialogTitle>Crear categoría de producto</DialogTitle>
      </DialogHeader>
      <CategoryProductForm onSubmitAction={handleCreate} isLoading={isLoading} serverError={serverError} />
    </DialogContent>
  </Dialog>
)
}