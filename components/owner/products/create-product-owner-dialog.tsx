'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useAuth } from '@/hooks/useAuth'

import { CategoryProduct } from '@/types/categories-products'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { CreateProductOwnerForm } from './create-product-owner-form'
import { createOwnerProduct } from '@/services/owner/product-owner.service'
import { CreateProductOwnerInput } from '@/schemas/products.schema'

type Props = {
  categories: CategoryProduct[]
  onSuccessAction?: () => Promise<void>
}

export const CreateProductOwnerDialog = ({
  categories,
  onSuccessAction,
}: Props) => {
  const { session } = useAuth()
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleOpenChange = (value: boolean) => {
    if (!value) setError(null)
    setOpen(value)
  }

  const onSubmit = async (data: CreateProductOwnerInput) => {
    if (!session) return
    try {
      setIsSubmitting(true)
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('price', String(data.price))
      data.categoryIds.forEach((id) => {
        formData.append('categoryIds', String(id))
      })
      if (data.description) formData.append('description', data.description)
      if (data.image) formData.append('image', data.image)

      await createOwnerProduct(formData)
      await onSuccessAction?.()
      setOpen(false)
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error creando el producto'
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>Agregar Producto</Button>
      </DialogTrigger>
      <DialogContent
        className='max-h-[90vh] overflow-y-auto'
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Crear Producto</DialogTitle>
          <DialogDescription>
            Completa los datos para agregar un nuevo producto.
          </DialogDescription>
        </DialogHeader>
        <CreateProductOwnerForm
          key={open ? 'open' : 'closed'}
          categories={categories}
          onSubmitAction={onSubmit}
          isSubmitting={isSubmitting}
          error={error}
        />
      </DialogContent>
    </Dialog>
  )
}
