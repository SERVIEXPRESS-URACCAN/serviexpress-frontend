'use client'

import { FormError } from '@/components/shared/form-error'
import { FormField } from '@/components/shared/form-field'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  UpdateProductInput,
  updateProductSchema,
} from '@/schemas/products.schema'
import { CategoryProduct } from '@/types/categories-products'
import { Product } from '@/types/products.type'
import { zodResolver } from '@hookform/resolvers/zod'

import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

type Props = {
  product: Product
  categories: CategoryProduct[]
  onSubmitAction: (data: UpdateProductInput) => Promise<void>
  isSubmitting?: boolean
  error?: string | null
}

export const EditProductAdminForm = ({
  product,
  categories,
  onSubmitAction,
  isSubmitting,
  error,
}: Props) => {
  const form = useForm<UpdateProductInput>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      name: product.name ?? '',
      description: product.description ?? '',
      price: Number(product.price) ?? 0,
      categoryId: product.category?.id ?? 0,
    },
  })

  const {
    formState: { errors },
  } = form

  useEffect(() => {
    form.reset({
      name: product.name,
      description: product.description || '',
      price: product.price,
      categoryId: product.category?.id,
    })
  }, [product, form])

  return (
    <form onSubmit={form.handleSubmit(onSubmitAction)} className='space-y-4'>
      <FormField label='Nombre' error={errors.name?.message}>
        <Input {...form.register('name')} placeholder='Nombre del producto' />
      </FormField>
      <FormField label='Descripción' error={errors.description?.message}>
        <Input {...form.register('description')} placeholder='Descripción' />
      </FormField>
      <FormField label='Precio' error={errors.price?.message}>
        <Input {...form.register('price')} placeholder='Precio' type='number' />
      </FormField>
      <FormField label='Categoría' error={errors.categoryId?.message}>
        <Controller
          name='categoryId'
          control={form.control}
          render={({ field }) => (
            <Select
              value={field.value ? String(field.value) : ''}
              onValueChange={(value) => field.onChange(Number(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder='Selecciona una categoría' />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={String(category.id)}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </FormField>

      <FormField label='Imagen' error={errors.image?.message}>
        <Input
          type='file'
          accept='image/*'
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) form.setValue('image', file)
          }}
        />
      </FormField>

      <FormError message={error ?? undefined} />

      <Button type='submit' className='w-full' disabled={isSubmitting}>
        {isSubmitting ? 'Guardando...' : 'Guardar cambios'}
      </Button>
    </form>
  )
}
