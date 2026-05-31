'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import {
  createOwnerSchema,
  type CreateOwner,
  type CreateOwnerInput
} from '@/schemas/owner.schema'

import { useCities } from '@/hooks/useCities'
import { phoneKeyDown } from '@/lib/phone'
import { User } from '@/types/user.type'

import { FormError } from '../../shared/form-error'
import { FormField } from '../../shared/form-field'
import { FormSection } from '../../shared/form-section'
import { ImageUploadField } from '../../shared/image-upload-field'
import { UserSearch } from './search-owner'

type Props = {
  users: User[]
  onSubmitAction: (data: CreateOwner) => Promise<void>
  isLoading?: boolean
  serverError?: string
}

export const CreateOwnerForm = ({
  users,
  onSubmitAction,
  isLoading,
  serverError
}: Props) => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<CreateOwnerInput, unknown, CreateOwner>({
    resolver: zodResolver(createOwnerSchema),
    defaultValues: {
      razonSocial: '',
      user: 0,
      business: {
        name: '',
        address: '',
        phone: '',
        city: 0
      }
    }
  })

  const { cities } = useCities()

  return (
    <form onSubmit={handleSubmit(onSubmitAction)} className="space-y-4">
      <FormSection title="Propietario" />

      <div className="space-y-2">
        <Controller
          control={control}
          name="user"
          render={({ field }) => (
            <UserSearch
              users={users}
              value={field.value as number | undefined}
              onChangeAction={field.onChange}
            />
          )}
        />

        <FormError message={errors.user?.message} />
      </div>

      <FormField
        label="Razón social"
        htmlFor="razonSocial"
        error={errors.razonSocial?.message}
      >
        <Input
          id="razonSocial"
          placeholder="Razón social"
          {...register('razonSocial')}
        />
      </FormField>

      <FormSection title="Negocio" />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Nombre del negocio"
          htmlFor="businessName"
          error={errors.business?.name?.message}
        >
          <Input
            id="businessName"
            placeholder="Negocio"
            {...register('business.name')}
          />
        </FormField>

        <FormField
          label="Teléfono"
          htmlFor="businessPhone"
          error={errors.business?.phone?.message || serverError}
        >
          <Input
            id="businessPhone"
            placeholder="8888-8888"
            inputMode="numeric"
            type="tel"
            maxLength={8}
            onKeyDown={phoneKeyDown}
            {...register('business.phone')}
          />
        </FormField>

        <FormField
          label="Dirección"
          htmlFor="address"
          error={errors.business?.address?.message}
        >
          <Input
            id="address"
            placeholder="Dirección"
            {...register('business.address')}
          />
        </FormField>

        <div className="space-y-2">
          <FormField label="Ciudad" error={errors.business?.city?.message}>
            <Controller
              control={control}
              name="business.city"
              render={({ field }) => (
                <Select
                  value={field.value ? String(field.value) : ''}
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione una ciudad" />
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
        </div>
      </div>

      <FormSection title="Identificación" />

      <ImageUploadField
        error={errors.identificationCardImage?.message}
        onChangeAction={(file) =>
          setValue('identificationCardImage', file, {
            shouldValidate: true
          })
        }
      />

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Guardando...' : 'Crear propietario'}
      </Button>
    </form>
  )
}
