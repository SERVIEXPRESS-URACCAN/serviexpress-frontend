'use client'

import { Controller, useForm } from 'react-hook-form'
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

type Props = {
  genders: Gender[]
  onSubmitAction: (data: CreateUserDto) => Promise<void>
  isLoading?: boolean
  serverError?: string | null
  onClearServerErrorAction?: () => void

}

export const ClientForm = ({
  genders,
  onSubmitAction,
  isLoading,
  serverError,
  onClearServerErrorAction
}: Props) => {
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

  const onSubmit = async (data: CreateUserDto) => {
    await onSubmitAction(data)
  }
  const [showPassword, setShowPassword] = useState(false)


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor='name'>Nombre</Label>
        <Input
          id='name'
        placeholder='nombre'
          {...register('profile.name')}
          className={errors.profile?.name ? 'border-destructive focus-visible:ring-destructive' : ''}
        />
        {errors.profile?.name && (
          <p className="text-sm text-destructive">{errors.profile.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor='lastName'>Apellido</Label>
        <Input
          id='lastName'
        placeholder='Apellido'
          {...register('profile.lastName')}
          className={errors.profile?.lastName ? 'border-destructive focus-visible:ring-destructive' : ''}
        />
        {errors.profile?.lastName && (
          <p className="text-sm text-destructive">{errors.profile.lastName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor='cellphone'>Teléfono</Label>
        <Input
          id='cellphone'
        placeholder='8888-8888'
          {...register('profile.cellphone')}
          className={errors.profile?.cellphone ? 'border-destructive focus-visible:ring-destructive' : ''}
        />
        {errors.profile?.cellphone && (
          <p className="text-sm text-destructive">{errors.profile.cellphone.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Género</Label>
        <Controller                                
          control={control}
          name="profile.gender_id"
          render={({ field }) => (
            <Select
              value={field.value? String(field.value): ''}
              onValueChange={(value) => field.onChange(Number(value))}
            >
              <SelectTrigger
                className={errors.profile?.gender_id ? 'border-destructive focus-visible:ring-destructive' : ''}
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
        {errors.profile?.gender_id && (
          <p className="text-sm text-destructive">{errors.profile.gender_id.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor='email' >Correo</Label>
        <Input
          id='email'
          {...register('email', {
            onChange: () => onClearServerErrorAction?.()
          })}
          className={errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}        {serverError && (
          <p className="text-sm text-destructive">{serverError}</p>
        )}

      </div>

      <div className="space-y-2">
        <Label htmlFor='password'>Contraseña</Label>
        <div className='relative'>
          <Input
            id='password'
            type={showPassword ? "text" : "password"}
            {...register('password')}
            className={errors.password ? 'border-destructive focus-visible:ring-destructive' : ''}
          />
          <button
            type="button"
            className="absolute right-2 top-2 text-muted-foreground hover:text-foreground"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Guardando...' : 'Guardar'}
      </Button>
    </form>
  )
}