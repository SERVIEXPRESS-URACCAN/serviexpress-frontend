import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useAuth } from '@/hooks/useAuth'
import { UpdateProductAdminInput } from '@/schemas/products.schema'
import { updateProduct } from '@/services/products.service'
import { CategoryProduct } from '@/types/categories-products'
import { Product } from '@/types/products.type'

import { useState } from 'react'
import { EditProductAdminForm } from './edit-product-admin-form'

type Props = {
  product: Product
  businessId: number
  categories: CategoryProduct[]
  open: boolean
  onOpenChangeAction: (open: boolean) => void
  refreshAction?: () => Promise<void>
}

export const EditProductAdminDialog = ({
  product,
  categories,
  businessId,
  open,
  onOpenChangeAction,
  refreshAction,
}: Props) => {
  const { session } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleOpenChange = (value: boolean) => {
    if (!value) setError(null)
    onOpenChangeAction(value)
  }

  const onSubmit = async (data: UpdateProductAdminInput) => {
    if (!session) return

    try {
      setIsSubmitting(true)
      const formData = new FormData()
      formData.append('name', data.name || '')
      formData.append('price', String(data.price))

      data.categoryIds?.forEach((id) => {
        formData.append('categoryIds', String(id))
      })
      formData.append('status', data.status ? 'true' : 'false')
      formData.append('businessId', String(businessId))
      if (data.description) formData.append('description', data.description)
      if (data.image) formData.append('image', data.image)

      await updateProduct(product.id, formData)
      await refreshAction?.()
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
        </DialogHeader>
        <EditProductAdminForm
          product={product}
          categories={categories}
          businessId={businessId}
          onSubmitAction={onSubmit}
          isSubmitting={isSubmitting}
          error={error}
        />
      </DialogContent>
    </Dialog>
  )
}
