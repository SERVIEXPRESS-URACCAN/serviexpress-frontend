'use client'

import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { Gender } from '@/types/gender.type'
import { createClientSchema, CreateUserDto, CreateUserInput } from '@/schemas/client.schema'
import { phoneKeyDown } from '@/lib/phone'

import { FormError } from '../../shared/form-error'
import { FormField } from '../../shared/form-field'

type Props = {
  genders: Gender[]
  onSubmitAction: (data: CreateUserDto) => Promise<void>
  isLoading?: boolean
  serverError?: { field: 'email' | 'cellphone', message: string } | null
  onClearServerErrorAction?: () => void
}

export const ClientForm = ({
  genders,
  onSubmitAction,
  isLoading,
  serverError,
  onClearServerErrorAction
}: Props) => {
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    control,
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

  return (
    <form onSubmit={handleSubmit(onSubmitAction)} className="space-y-4">

      <FormField label="Nombre" htmlFor="name" error={errors.profile?.name?.message}>
        <Input
          id="name"
          placeholder="Nombre"
          {...register('profile.name')}
        />
      </FormField>

      <FormField label="Apellido" htmlFor="lastName" error={errors.profile?.lastName?.message}>
        <Input
          id="lastName"
          placeholder="Apellido"
          {...register('profile.lastName')}
        />
      </FormField>

      <FormField label="Teléfono" htmlFor="cellphone" error={errors.profile?.cellphone?.message}>
        <Input
          id="cellphone"
          placeholder="8888-8888"
          inputMode="numeric"
          type="tel"
          maxLength={8}
          onKeyDown={phoneKeyDown}
          {...register('profile.cellphone', {  onChange: () => onClearServerErrorAction?.()})}
        />
        <FormError message={serverError?.field === 'cellphone' ? serverError.message : undefined} />
      </FormField>

      <div className="space-y-2">
        <FormField label="Género" error={errors.profile?.gender_id?.message}>
          <Controller
            control={control}
            name="profile.gender_id"
            render={({ field }) => (
              <Select
                value={field.value ? String(field.value) : ''}
                onValueChange={(value) => field.onChange(Number(value))}
              >
                <SelectTrigger
                  className="w-full"
                >
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
      </div>

      <FormField label="Correo" htmlFor="email" error={errors.email?.message}>
        <Input
          id="email"
          {...register('email', {
            onChange: () => onClearServerErrorAction?.()
          })}
          className={errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}
        />
        <FormError message={serverError?.field === 'email' ? serverError.message : undefined} />
      </FormField>

      <FormField label="Contraseña" htmlFor="password" error={errors.password?.message}>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            className={errors.password ? 'border-destructive focus-visible:ring-destructive' : ''}
          />
          <button
            type="button"
            className="absolute right-2 top-2 text-muted-foreground hover:text-foreground"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </FormField>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Guardando...' : 'Guardar'}
      </Button>

    </form>
  )
}