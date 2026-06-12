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
  UpdateBusinessInput,
  updateBusinessSchema,
} from '@/schemas/business.schema'
import { Business } from '@/types/business.type'
import { CategoryBusiness } from '@/types/categories-business'
import { City } from '@/types/city.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm, useWatch } from 'react-hook-form'

type Props = {
  business: Business
  cities: City[]
  categories: CategoryBusiness[]
  onSubmitAction: (data: UpdateBusinessInput) => Promise<void>
  isSubmitting?: boolean
  error?: string | null
}

export const EditBusinessForm = ({
  business,
  cities,
  categories,
  onSubmitAction,
  isSubmitting,
  error,
}: Props) => {
  const form = useForm<UpdateBusinessInput>({
    resolver: zodResolver(updateBusinessSchema),
    defaultValues: {
      name: business.name ?? '',
      description: business.description ?? '',
      address: business.address ?? '',
      phone: business.phone?.replace('+505', '') ?? '',
      businessCategories: business.categories?.map((c) => c.id) ?? [],
      city: business.city?.id ?? 0,
    },
  })

  const {
    formState: { errors },
  } = form
  const businessCategories = useWatch({
    control: form.control,
    name: 'businessCategories',
  })

  return (
    <form onSubmit={form.handleSubmit(onSubmitAction)} className='space-y-4'>
      <FormField label='Nombre' error={errors.name?.message}>
        <Input {...form.register('name')} placeholder='Nombre del negocio' />
      </FormField>

      <FormField label='Descripción' error={errors.description?.message}>
        <Input {...form.register('description')} placeholder='Descripción' />
      </FormField>
      <FormField label='Dirección' error={errors.address?.message}>
        <Input {...form.register('address')} placeholder='Dirección' />
      </FormField>
      <FormField
        label='Teléfono'
        error={
          errors.phone?.message ||
          (error?.toLowerCase().includes('dato duplicado')
            ? 'El teléfono ya está registrado'
            : undefined)
        }
      >
        <Input
          {...form.register('phone')}
          placeholder='88887777'
          inputMode='numeric'
          type='tel'
          maxLength={8}
        />
      </FormField>

      <FormField label='Ciudad' error={errors.city?.message}>
        <Controller
          name='city'
          control={form.control}
          render={({ field }) => (
            <Select
              value={String(field.value)}
              onValueChange={(value) => field.onChange(Number(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder='Selecciona una ciudad' />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city.id} value={String(city.id)}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </FormField>
      <FormField label='Categorías' error={errors.businessCategories?.message}>
        <div className='space-y-2'>
          {categories.map((category) => (
            <div key={category.id} className='flex items-center gap-2'>
              <input
                type='checkbox'
                id={`category-${category.id}`}
                checked={businessCategories?.includes(category.id) ?? false}
                onChange={(e) => {
                  const current = form.getValues('businessCategories') ?? []
                  if (e.target.checked) {
                    form.setValue('businessCategories', [
                      ...current,
                      category.id,
                    ])
                  } else {
                    form.setValue(
                      'businessCategories',
                      current.filter((id) => id !== category.id),
                    )
                  }
                }}
                className='rounded border'
              />
              <label htmlFor={`category-${category.id}`} className='text-sm'>
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </FormField>
      <FormError
        message={
          error?.toLowerCase().includes('teléfono') ||
          error?.toLowerCase().includes('phone')
            ? 'El teléfono ya está registrado'
            : undefined
        }
      />
      <Button type='submit' className='w-full' disabled={isSubmitting}>
        {isSubmitting ? 'Guardando...' : 'Guardar cambios'}
      </Button>
    </form>
  )
}
