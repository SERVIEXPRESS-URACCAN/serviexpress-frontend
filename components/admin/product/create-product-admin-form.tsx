// components/admin/business/create-product-form.tsx
'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormField } from '@/components/shared/form-field'
import { FormError } from '@/components/shared/form-error'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { CategoryProduct } from '@/types/categories-products'
import {
  CreateProductInput,
  createProductSchema,
} from '@/schemas/products.schema'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import { Check } from 'lucide-react'

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

      <FormField label='Categorías' error={errors.categoryIds?.message}>
        <Controller
          name='categoryIds'
          control={form.control}
          render={({ field }) => {
            const selected = field.value ?? []

            return (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant='outline' className='w-full justify-start'>
                    {selected.length > 0
                      ? categories
                          .filter((c) => selected.includes(c.id))
                          .map((c) => c.name)
                          .join(', ')
                      : 'Selecciona categorías'}
                  </Button>
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
                              const selected = (field.value ?? []).map(Number)

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
        {isSubmitting ? 'Guardando...' : 'Crear Producto'}
      </Button>
    </form>
  )
}
