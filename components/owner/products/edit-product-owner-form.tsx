'use client'

import { FormError } from '@/components/shared/form-error'
import { FormField } from '@/components/shared/form-field'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import {
  UpdateProductOwnerInput,
  updateProductOwnerSchema,
} from '@/schemas/products.schema'
import { CategoryProduct } from '@/types/categories-products'
import { Product } from '@/types/products.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check } from 'lucide-react'

import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

type Props = {
  product: Product
  categories: CategoryProduct[]
  onSubmitAction: (data: UpdateProductOwnerInput) => Promise<void>
  isSubmitting?: boolean
  error?: string | null
}

export const EditProductOwnerForm = ({
  product,
  categories,
  onSubmitAction,
  isSubmitting,
  error,
}: Props) => {
  const form = useForm<UpdateProductOwnerInput>({
    resolver: zodResolver(updateProductOwnerSchema),
    defaultValues: {
      name: product.name ?? '',
      description: product.description ?? '',
      price: Number(product.price) ?? 0,
      categoryIds: product.categories?.map((c) => c.id) ?? [],
      status: product.status ?? true,
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
      categoryIds: product.categories?.map((c) => c.id) ?? [],
      status: product.status,
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
        <Input
          type='number'
          {...form.register('price')}
          onInput={(e) => {
            const target = e.target as HTMLInputElement
            target.value = target.value.slice(0, 6)
          }}
          placeholder='Precio'
        />
      </FormField>
      <FormField label='Categorías' error={errors.categoryIds?.message}>
        <Controller
          name='categoryIds'
          control={form.control}
          render={({ field }) => {
            const selected = field.value ?? []

            return (
              <Popover>
                <PopoverTrigger className='w-full border rounded px-3 py-2 text-left'>
                  {selected.length > 0
                    ? categories
                        .filter((c) => selected.includes(c.id))
                        .map((c) => c.name)
                        .join(', ')
                    : 'Selecciona categorías'}
                </PopoverTrigger>

                <PopoverContent className='w-72 p-0'>
                  <Command>
                    <CommandInput placeholder='Buscar categorías...' />
                    <CommandEmpty>No encontradas</CommandEmpty>

                    <CommandGroup>
                      {categories.map((category) => {
                        const isSelected = selected.includes(category.id)

                        return (
                          <CommandItem
                            key={category.id}
                            onSelect={() => {
                              const newValue = isSelected
                                ? selected.filter((id) => id !== category.id)
                                : [...selected, category.id]

                              field.onChange(newValue)
                            }}
                          >
                            <Check
                              className={`mr-2 h-4 w-4 ${
                                isSelected ? 'opacity-100' : 'opacity-0'
                              }`}
                            />
                            {category.name}
                          </CommandItem>
                        )
                      })}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            )
          }}
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
