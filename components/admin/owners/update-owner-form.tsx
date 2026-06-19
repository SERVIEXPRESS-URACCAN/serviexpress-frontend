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
  UpdateOwnerInput,
  updateOwnerSchema,
  type UpdateOwner
} from '@/schemas/owner.schema'

import { useGenders } from '@/hooks/useGenders'
import { phoneKeyDown } from '@/lib/phone'

import { FormError } from '../../shared/form-error'
import { FormField } from '../../shared/form-field'
import { FormSection } from '../../shared/form-section'
import { ImageUploadField } from '../../shared/image-upload-field'

type Props = {
  defaultValues?: UpdateOwnerInput
  onSubmitAction: (data: UpdateOwner) => Promise<void>
  isLoading?: boolean
}

export const UpdateOwnerForm = ({
  defaultValues,
  onSubmitAction,
  isLoading
}: Props) => {

  const { genders } = useGenders()

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<UpdateOwnerInput, unknown, UpdateOwner>({
    resolver: zodResolver(updateOwnerSchema),
    defaultValues
  })

  return (
    <form onSubmit={handleSubmit(onSubmitAction)} className="space-y-4">
      <FormSection title="Propietario" />

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

      <FormSection title="Perfil" />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Nombre"
          htmlFor="name"
          error={errors.profile?.name?.message}
        >
          <Input id="name" placeholder="Nombre" {...register('profile.name')} />
        </FormField>

        <FormField
          label="Apellido"
          htmlFor="lastName"
          error={errors.profile?.lastName?.message}
        >
          <Input
            id="lastName"
            placeholder="Apellido"
            {...register('profile.lastName')}
          />
        </FormField>

        <FormField
          label="Teléfono"
          htmlFor="cellphone"
          error={errors.profile?.cellphone?.message}
        >
          <Input
            id="cellphone"
            placeholder="88888888"
            inputMode="numeric"
            maxLength={8}
            onKeyDown={phoneKeyDown}
            {...register('profile.cellphone')}
          />
        </FormField>

        <div className="space-y-2">
          <label className="text-sm font-medium">Género</label>

          <Controller
            control={control}
            name="profile.genderId"
            render={({ field }) => (
              <Select
                value={field.value ? String(field.value) : ''}
                onValueChange={(value) => field.onChange(Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un género" />
                </SelectTrigger>

                <SelectContent position="popper" className="z-50">
                  {genders.map((gender) => (
                    <SelectItem key={gender.id} value={String(gender.id)}>
                      {gender.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          <FormError message={errors.profile?.genderId?.message} />
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
        {isLoading ? 'Guardando...' : 'Guardar cambios'}
      </Button>
    </form>
  )
}
