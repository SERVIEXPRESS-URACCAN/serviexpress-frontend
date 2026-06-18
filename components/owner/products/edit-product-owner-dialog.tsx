'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useAuth } from '@/hooks/useAuth'
import { UpdateProductInput } from '@/schemas/products.schema'
import { CategoryProduct } from '@/types/categories-products'
import { Product } from '@/types/products.type'

import { useState } from 'react'
import { EditProductOwnerForm } from './edit-product-owner-form'
import { updateOwnerProduct } from '@/services/owner/product-owner.service'

type Props = {
  product: Product
  categories: CategoryProduct[]
  open: boolean
  onOpenChangeAction: (open: boolean) => void
  onSuccessAction?: () => Promise<void>
}

export const EditProductOwnerDialog = ({
  product,
  categories = [],
  open,
  onOpenChangeAction,
  onSuccessAction,
}: Props) => {
  const { session } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const handleOpenChange = (value: boolean) => {
    if (!value) setError(null)
    onOpenChangeAction(value)
  }

  const onSubmit = async (data: UpdateProductInput) => {
    if (!session) return

    try {
      setIsSubmitting(true)
      const formData = new FormData()

      formData.append('name', data.name || '')
      formData.append('price', String(data.price))
      ;(data.categoryIds ?? []).forEach((id) => {
        formData.append('categoryIds', String(id))
      })

      formData.append('status', data.status ? 'true' : 'false')
      if (data.description) formData.append('description', data.description)
      if (data.image) formData.append('image', data.image)

      await updateOwnerProduct(product.id, formData)
      await onSuccessAction?.()
      onOpenChangeAction(false)
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Error actualizando el producto'
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className='max-h-[90vh] overflow-y-auto'
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Editar Producto</DialogTitle>
          <DialogDescription>Editar Producto</DialogDescription>
        </DialogHeader>
        <EditProductOwnerForm
          product={product}
          categories={categories}
          onSubmitAction={onSubmit}
          isSubmitting={isSubmitting}
          error={error}
        />
      </DialogContent>
    </Dialog>
  )
}
