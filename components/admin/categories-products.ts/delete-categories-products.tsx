'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'

import { CategoryProduct } from '@/types/categories-products'

import { deleteCategoryProduct } from '@/services/categories-products'
import { useAuth } from '@/hooks/useAuth'



type Props = {
  categoryProduct: CategoryProduct
  open: boolean
  onOpenChangeAction: (open: boolean) => void
}

export const DeleteCategoryProductDialog = ({
  categoryProduct,
  open,
  onOpenChangeAction
}: Props) => {
  const router = useRouter()

  const { session } = useAuth()

  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    try {
      setIsLoading(true)

      await deleteCategoryProduct(
        categoryProduct.id,
        session!.accessToken
      )

      onOpenChangeAction(false)

      router.refresh()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChangeAction}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Eliminar categoría de producto
          </DialogTitle>

          <DialogDescription>
            ¿Estás segura de eliminar la categoría de producto {categoryProduct.name}?
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChangeAction(false)}
            disabled={isLoading}
          >
            Cancelar
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? 'Eliminando...' : 'Eliminar'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}