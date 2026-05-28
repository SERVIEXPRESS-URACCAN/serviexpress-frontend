'use client'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { Gender } from '@/types/gender.type'
import { UpdateClientProfileDto, UpdateClientProfileInput, updateClientProfileSchema } from '@/schemas/client.schema'


type Props = {
  genders: Gender[]
  defaultValues?: UpdateClientProfileInput
  onSubmitAction: (data: UpdateClientProfileDto) => Promise<void>
  isLoading?: boolean
  serverError?: string | null
}

export const ClientEditForm = ({
  genders,
  onSubmitAction,
  isLoading,
  serverError,
  defaultValues
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdateClientProfileInput, unknown, UpdateClientProfileDto>({
    resolver: zodResolver(updateClientProfileSchema),
    defaultValues: {
      name: defaultValues?.name || '',
      lastName:
        defaultValues?.lastName || '',
      cellphone:
        defaultValues?.cellphone || '',
      gender_id:
        defaultValues?.gender_id || 0
    }

  })


  return (
    <form
      onSubmit={handleSubmit(onSubmitAction)} className="space-y-4"
    >
      {serverError && (
        <p className="text-sm text-destructive">
          {serverError}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Nombre</Label>

          <Input {...register('name')} />

          {errors.name && (
            <p className="text-sm text-destructive">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Apellido</Label>

          <Input {...register('lastName')} />

          {errors.lastName && (
            <p className="text-sm text-destructive">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Teléfono</Label>

        <Input {...register('cellphone')} />

        {errors.cellphone && (
          <p className="text-sm text-destructive">
            {errors.cellphone.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Género</Label>

        <select
          className="w-full border rounded-md p-2"
          {...register('gender_id', {
          })}
        >
          <option value="">Selecciona un género</option>

          {genders.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>

        {errors.gender_id && (
          <p className="text-sm text-destructive">
            {errors.gender_id.message}
          </p>
        )}
      </div>
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