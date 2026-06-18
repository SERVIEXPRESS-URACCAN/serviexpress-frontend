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
  CreateProductAdminInput,
  createProductAdminSchema,
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
  onSubmitAction: (data: CreateProductAdminInput) => Promise<void>
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
  const form = useForm<CreateProductAdminInput>({
    resolver: zodResolver(createProductAdminSchema),
    defaultValues: {
      businessId,
    },
  })

  const {
    formState: { errors },
  } = form
  console.log('BUSINESS ID PROP:', businessId)
  console.log('TYPE:', typeof businessId)
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
