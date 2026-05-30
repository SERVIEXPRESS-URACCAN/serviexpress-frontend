'use client'

import { zodResolver } from '@hookform/resolvers/zod'
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
import { phoneKeyDown } from '@/lib/phone'

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
  const { session } = useAuth()
  const { genders } = useGenders(session?.accessToken ?? '')

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
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground border-b pb-1">
        Propietario
      </p>

      <div className="space-y-2">
        <Label htmlFor="razonSocial">Razón social</Label>
        <Input
          id="razonSocial"
          placeholder="Razón social"
          {...register('razonSocial')}
        />
        {errors.razonSocial && (
          <p className="text-sm text-red-400">{errors.razonSocial.message}</p>
        )}
      </div>

      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground border-b pb-1">
        Perfil
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre</Label>
          <Input id="name" placeholder="Nombre" {...register('profile.name')} />
          {errors.profile?.name && (
            <p className="text-sm text-red-400">
              {errors.profile.name.message}
            </p>
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
            placeholder="88888888"
            inputMode="numeric"
            maxLength={8}
            onKeyDown={phoneKeyDown}
            {...register('profile.cellphone')}
          />
          {errors.profile?.cellphone && (
            <p className="text-sm text-red-400">
              {errors.profile.cellphone.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Género</Label>
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
                <SelectContent>
                  {genders.map((gender) => (
                    <SelectItem key={gender.id} value={String(gender.id)}>
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
      </div>

      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground border-b pb-1">
        Identificación
      </p>

      <div className="space-y-2">
        <Label htmlFor="image">Imagen de identificación</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file)
              setValue('identificationCardImage', file, {
                shouldValidate: true
              })
          }}
        />
        {errors.identificationCardImage && (
          <p className="text-sm text-red-400">
            {errors.identificationCardImage.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Guardando...' : 'Guardar cambios'}
      </Button>
    </form>
  )
}
