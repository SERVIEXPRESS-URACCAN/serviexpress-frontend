'use client'

import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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

import { useAuth } from '@/hooks/useAuth'
import { useGenders } from '@/hooks/useGenders'
import { zodResolver } from '@hookform/resolvers/zod'

type Props = {
  defaultValues?: UpdateOwnerInput

  onSubmitAction: (data: UpdateOwner) => Promise<void>

  isLoading?: boolean
}

export const OwnerForm = ({
  defaultValues,
  onSubmitAction,
  isLoading
}: Props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdateOwnerInput, unknown, UpdateOwner>({
    resolver: zodResolver(updateOwnerSchema),
    defaultValues
  })

  const { session } = useAuth()

  const { genders } = useGenders(session?.accessToken ?? '')

  return (
    <form onSubmit={handleSubmit(onSubmitAction)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nombre</Label>

        <Input id="name" placeholder="Nombre" {...register('profile.name')} />

        {errors.profile?.name && (
          <p className="text-sm text-red-400">{errors.profile.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="lastName">Apellido</Label>

        <Input
          id="lastName"
          placeholder="Apellido"
          {...register('profile.lastName')}
        />

        {errors.profile?.lastName && (
          <p className="text-sm text-red-400">
            {errors.profile.lastName.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="cellphone">Teléfono</Label>

        <Input
          id="cellphone"
          placeholder="Teléfono"
          {...register('profile.cellphone')}
        />

        {errors.profile?.cellphone && (
          <p className="text-sm text-red-400">
            {errors.profile.cellphone.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="razonSocial">Razón Social</Label>

        <Input
          id="razonSocial"
          placeholder="Razón social"
          {...register('razonSocial')}
        />

        {errors.razonSocial && (
          <p className="text-sm text-red-400">{errors.razonSocial.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label>Género</Label>

        <Controller
          control={control}
          name="profile.genderId"
          render={({ field }) => (
            <Select
              value={field.value?.toString()}
              onValueChange={(value) => field.onChange(Number(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione un genero" />
              </SelectTrigger>

              <SelectContent>
                {genders.map((gender) => (
                  <SelectItem key={gender.id} value={gender.id.toString()}>
                    {gender.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        {errors.profile?.genderId && (
          <p className="text-sm text-red-400">
            {errors.profile.genderId.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Guardando...' : 'Guardar'}
      </Button>
    </form>
  )
}
