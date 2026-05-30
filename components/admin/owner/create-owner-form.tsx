// components/admin/owner/create-owner-form.tsx

'use client'

import { Controller, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

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
  createOwnerSchema,
  type CreateOwner,
  type CreateOwnerInput
} from '@/schemas/owner.schema'

import { useCities } from '@/hooks/useCities'
import { User } from '@/types/user.type'
import { UserSearch } from './search-owner'

type Props = {
  users: User[]
  onSubmitAction: (data: CreateOwner) => Promise<void>

  isLoading?: boolean
}

export const CreateOwnerForm = ({
  users,
  onSubmitAction,
  isLoading
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
      {/* Sección propietario */}
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground border-b pb-1">
        Propietario
      </p>

      <div className="space-y-2">
        <Label>Usuario</Label>
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
        {errors.user && (
          <p className="text-sm text-red-400">{errors.user.message}</p>
        )}
      </div>

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

      {/* Sección negocio — 2 columnas */}
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground border-b pb-1">
        Negocio
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="businessName">Nombre del negocio</Label>
          <Input
            id="businessName"
            placeholder="Negocio"
            {...register('business.name')}
          />
          {errors.business?.name && (
            <p className="text-sm text-red-400">
              {errors.business.name.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="businessPhone">Teléfono</Label>
          <Input
            id="businessPhone"
            placeholder="8888-8888"
            {...register('business.phone')}
          />
          {errors.business?.phone && (
            <p className="text-sm text-red-400">
              {errors.business.phone.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Dirección</Label>
          <Input
            id="address"
            placeholder="Dirección"
            {...register('business.address')}
          />
          {errors.business?.address && (
            <p className="text-sm text-red-400">
              {errors.business.address.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Ciudad</Label>
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
          {errors.business?.city && (
            <p className="text-sm text-red-400">
              {errors.business.city.message}
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
          onChange={(event) => {
            const file = event.target.files?.[0]
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
        {isLoading ? 'Guardando...' : 'Crear propietario'}
      </Button>
    </form>
  )
}
