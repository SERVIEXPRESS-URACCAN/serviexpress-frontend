'use client'

import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'


import { FormField } from '../../shared/form-field'
import { CategoryProduct } from '@/types/categories-products'
import { CreateProduct, CreateProductInput, createProductSchema } from '@/schemas/product.shema'

type Props = {
  categories: CategoryProduct[]
  onSubmitAction: (data: CreateProduct) => Promise<void>
  isLoading?: boolean
}

export const ProductForm = ({
  categories,
  onSubmitAction,
  isLoading
}: Props) => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<CreateProductInput, unknown, CreateProduct>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      categoryId: 0,
      productImage: undefined
    }
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmitAction)}
      className="space-y-4"
    >
      <FormField
        label="Nombre"
        htmlFor="name"
        error={errors.name?.message}
      >
        <Input
          id="name"
          placeholder="Nombre del producto"
          {...register('name')}
        />
      </FormField>

      <FormField
        label="Descripción"
        htmlFor="description"
        error={errors.description?.message}
      >
        <Textarea
          id="description"
          placeholder="Descripción del producto"
          {...register('description')}
        />
      </FormField>

      <FormField
        label="Precio"
        htmlFor="price"
        error={errors.price?.message}
      >
        <Input
          id="price"
          type="number"
          step="0.01"
          placeholder="0.00"
          {...register('price')}
        />
      </FormField>

      <FormField
        label="Categoría"
        error={errors.categoryId?.message}
      >
        <Controller
          control={control}
          name="categoryId"
          render={({ field }) => (
            <Select
              value={field.value ? String(field.value) : ''}
              onValueChange={(value) =>
                field.onChange(Number(value))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>

              <SelectContent>
                {categories.map((category) => (
                  <SelectItem
                    key={category.id}
                    value={category.id.toString()}
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </FormField>

      <FormField
        label="Imagen"
        error={errors.productImage?.message}
      >
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0]
            setValue('productImage', file)
          }}
        />
      </FormField>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Guardando...' : 'Guardar'}
      </Button>
    </form>
  )
}