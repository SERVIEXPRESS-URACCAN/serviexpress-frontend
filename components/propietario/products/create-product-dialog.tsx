'use client'

import { useState } from 'react'
import Swal from 'sweetalert2'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'

import { ProductForm } from './product-form'

import { createProduct } from '@/services/products.service'
import { CategoryProduct } from '@/types/categories-products'
import { CreateProduct } from '@/schemas/product.shema'

type Props = {
  token: string
  categories: CategoryProduct[]
  onCreatedAction: () => void
}

export const CreateProductDialog = ({
  token,
  categories,
  onCreatedAction
}: Props) => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleCreate = async (data: CreateProduct) => {
    try {
      setIsLoading(true)

      await createProduct(data, token)

      setOpen(false)

      onCreatedAction()

      await Swal.fire({
        icon: 'success',
        title: 'Producto creado',
        text: `El producto "${data.name}" fue creado exitosamente.`,
        timer: 2000,
        showConfirmButton: false
      })
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text:
          error instanceof Error
            ? error.message
            : 'No se pudo crear el producto'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Nuevo producto</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Crear producto</DialogTitle>
        </DialogHeader>

        <ProductForm
          categories={categories}
          onSubmitAction={handleCreate}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  )
}