'use client'

import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Gender } from '@/types/gender.type'
import { UpdateClientProfileDto, UpdateClientProfileInput, updateClientProfileSchema } from '@/schemas/client.schema'
import { FormField } from '../../shared/form-field'
import { FormError } from '../../shared/form-error'

type Props = {
  genders: Gender[]
  defaultValues?: UpdateClientProfileInput
  onSubmitAction: (data: UpdateClientProfileDto) => Promise<void>
  isLoading?: boolean
  serverError?: { field: 'cellphone', message: string } | null
  onClearServerErrorAction?: () => void

}

export const ClientEditForm = ({
  genders,
  onSubmitAction,
  isLoading,
  serverError,
  defaultValues,
  onClearServerErrorAction

}: Props) => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<UpdateClientProfileInput, unknown, UpdateClientProfileDto>({
    resolver: zodResolver(updateClientProfileSchema),
    defaultValues: {
      name: defaultValues?.name || '',
      lastName: defaultValues?.lastName || '',
      cellphone: defaultValues?.cellphone || '',
      gender_id: defaultValues?.gender_id || 0,
      status: defaultValues?.status ?? true,
      profileImage: null
    }
  })

  return (
    <form onSubmit={handleSubmit(onSubmitAction)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">

        <FormField label="Imagen de perfil" error={errors.profileImage?.message?.toString()}>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setValue('profileImage', e.target.files?.[0] || null)}
          />
        </FormField>

        <FormField label="Nombre" htmlFor="name" error={errors.name?.message}>
          <Input id="name" {...register('name')} />
        </FormField>

        <FormField label="Apellido" htmlFor="lastName" error={errors.lastName?.message}>
          <Input id="lastName" {...register('lastName')} />
        </FormField>

      </div>

      <FormField label="Teléfono" htmlFor="cellphone" error={errors.cellphone?.message}>
        <Input id="cellphone" {...register('cellphone', { onChange: () => onClearServerErrorAction?.() })} />        
        <FormError message={serverError?.field === 'cellphone' ? serverError.message : undefined} />

      </FormField>

      <div className="grid gap-4 sm:grid-cols-2">

        <FormField label="Género" error={errors.gender_id?.message}>
          <Controller
            control={control}
            name="gender_id"
            render={({ field }) => (
              <Select
                value={field.value ? String(field.value) : ''}
                onValueChange={(value) => field.onChange(Number(value))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona un género" />
                </SelectTrigger>
                <SelectContent>
                  {genders.map((g) => (
                    <SelectItem key={g.id} value={g.id.toString()}>
                      {g.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </FormField>

        <FormField label="Estado" error={errors.status?.message}>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select
                value={field.value !== undefined ? String(field.value) : ''}
                onValueChange={(value) => field.onChange(value === 'true')}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona un estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Activo</SelectItem>
                  <SelectItem value="false">Inactivo</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </FormField>

      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Guardando...' : 'Guardar'}
      </Button>

    </form>
  )
}