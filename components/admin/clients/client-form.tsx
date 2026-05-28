'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { Gender } from '@/types/gender.type'
import {
  createClientSchema,
  CreateUserDto,
  CreateUserInput
} from '@/schemas/client.schema'

type Props = {
  genders: Gender[]
  onSubmitAction: (data: CreateUserDto) => Promise<void>
  isLoading?: boolean
  serverError?: string | null
}

export const ClientForm = ({
  genders,
  onSubmitAction,
  isLoading,
  serverError
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateUserInput, unknown, CreateUserDto>({
    resolver: zodResolver(createClientSchema),
    defaultValues: {
      email: '',
      password: '',
      profile: {
        name: '',
        lastName: '',
        cellphone: '',
        gender_id: 0
      }
    }
  })

  const onSubmit = async (data: CreateUserDto) => {
    await onSubmitAction(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      {serverError && (
        <p className="text-sm text-destructive">
          {serverError}
        </p>
      )}

      <div className="space-y-2">
        <Label>Nombre</Label>
        <Input {...register('profile.name')} />
        {errors.profile?.name && (
          <p className="text-sm text-destructive">
            {errors.profile.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Apellido</Label>
        <Input {...register('profile.lastName')} />
        {errors.profile?.lastName && (
          <p className="text-sm text-destructive">
            {errors.profile.lastName.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Teléfono</Label>
        <Input {...register('profile.cellphone')} />
        {errors.profile?.cellphone && (
          <p className="text-sm text-destructive">
            {errors.profile.cellphone.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Género</Label>
        <select
          className="w-full border rounded-md p-2"
          {...register('profile.gender_id')}
        >
          <option value={0}>Selecciona un género</option>

          {genders.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>

        {errors.profile?.gender_id && (
          <p className="text-sm text-destructive">
            {errors.profile.gender_id.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Email</Label>
        <Input {...register('email')} />

        {errors.email && (
          <p className="text-sm text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Contraseña</Label>
        <Input type="password" {...register('password')} />

        {errors.password && (
          <p className="text-sm text-destructive">
            {errors.password.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Guardando...' : 'Guardar'}
      </Button>
    </form>
  )
}