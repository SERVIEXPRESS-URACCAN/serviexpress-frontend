'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'

import { CategoryProductForm } from './categories-products-form'
import { createCategoryProduct } from '@/services/categories-products'
import { useAuth } from '@/hooks/useAuth'


export const CreateCategoryProductDialog = () => {
  const router = useRouter()
    const { session } = useAuth();
  

  const [open, setOpen] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const handleCreate = async (data: { name: string }) => {
    try {
      setIsLoading(true)

      await createCategoryProduct(data,session!.accessToken )

      setOpen(false)

      router.refresh()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Nueva categoría de producto</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear categoría de producto</DialogTitle>
        </DialogHeader>

        <CategoryProductForm onSubmitAction={handleCreate} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  )
}
