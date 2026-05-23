'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { CategoryProduct, UpdateCategoryProductDto } from '@/types/categories-products'
import { updateCategoryProduct } from '@/services/categories-products.service'
import { CategoryProductForm } from './categories-products-form'
import { useAuth } from '@/hooks/useAuth'




type Props = {
  categoryProduct: CategoryProduct
  open: boolean
  onOpenChangeAction: (open: boolean) => void
}

export const EditCategoryProductDialog = ({ categoryProduct, open, onOpenChangeAction }: Props) => {
  const router = useRouter()
  const { session } = useAuth();

  const [isLoading, setIsLoading] = useState(false)

  const handleUpdate = async (data: UpdateCategoryProductDto) => {
    try {
      setIsLoading(true)

      await updateCategoryProduct(categoryProduct.id, data, session!.accessToken )

      onOpenChangeAction(false)

      router.refresh()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChangeAction}>
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
        />
      </DialogContent>
    </Dialog>
  )
}
