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
import { CreateProductInput } from '@/schemas/products.schema'
import { createProduct } from '@/services/products.service'
import { CategoryProduct } from '@/types/categories-products'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { CreateProductAdminForm } from './create-product-admin-form'
import { Button } from '@/components/ui/button'

type Props = {
  businessId: number
  categories: CategoryProduct[]
}

export const CreateProductAdminDialog = ({ businessId, categories }: Props) => {
  const router = useRouter()
  const { session } = useAuth()
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleOpenChange = (value: boolean) => {
    if (!value) setError(null)
    setOpen(value)
  }

  const onSubmit = async (data: CreateProductInput) => {
    if (!session) return
    try {
      setIsSubmitting(true)
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('price', String(data.price))
      formData.append('businessId', String(data.businessId))
      data.categoryIds.forEach((id) => {
        formData.append('categoryIds', String(id))
      })
      if (data.description) formData.append('description', data.description)
      if (data.image) formData.append('image', data.image)

      await createProduct(formData)
      router.refresh()
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
        <CreateProductAdminForm
          key={open ? 'open' : 'closed'}
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
