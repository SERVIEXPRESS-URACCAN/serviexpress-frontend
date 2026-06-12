// components/admin/business/create-product-form.tsx
'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormField } from '@/components/shared/form-field'
import { FormError } from '@/components/shared/form-error'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { CategoryProduct } from '@/types/categories-products'
import {
  CreateProductInput,
  createProductSchema,
} from '@/schemas/products.schema'

type Props = {
  categories: CategoryProduct[]
  businessId: number
  onSubmitAction: (data: CreateProductInput) => Promise<void>
  isSubmitting?: boolean
  error?: string | null
}

export const CreateProductAdminForm = ({
  categories,
  businessId,
  onSubmitAction,
  isSubmitting,
  error,
}: Props) => {
  const form = useForm<CreateProductInput>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      businessId,
    },
  })

  const {
    formState: { errors },
  } = form

  return (
    <form onSubmit={form.handleSubmit(onSubmitAction)} className='space-y-4'>
      <FormField label='Nombre' error={errors.name?.message}>
        <Input {...form.register('name')} placeholder='Nombre del producto' />
      </FormField>

      <FormField label='Descripción' error={errors.description?.message}>
        <Input {...form.register('description')} placeholder='Descripción' />
      </FormField>

      <FormField label='Precio' error={errors.price?.message}>
        <Input
          {...form.register('price')}
          type='number'
          step='0.01'
          placeholder='0.00'
        />
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
        {isSubmitting ? 'Guardando...' : 'Crear Producto'}
      </Button>
    </form>
  )
}
