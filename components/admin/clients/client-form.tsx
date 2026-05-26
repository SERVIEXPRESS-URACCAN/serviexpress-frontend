'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { CreateUserDto } from '@/types/user.type'
import { Gender } from '@/types/gender.type'

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
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [cellphone, setCellphone] = useState('')
  const [genderId, setGenderId] = useState<number | ''>('')

const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    await onSubmitAction({
      email,
      password,
      profile: {
        name,
        lastName,
        cellphone,
        gender_id: Number(genderId)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {serverError && (
        <p className="text-sm text-red-500">{serverError}</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Nombre</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label>Apellido</Label>
          <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Teléfono</Label>
        <Input value={cellphone} onChange={(e) => setCellphone(e.target.value)} />
      </div>

      <div className="space-y-2">
        <Label>Género</Label>

        <select
          className="w-full border rounded-md p-2"
          value={genderId}
          onChange={(e) => setGenderId(Number(e.target.value))}
        >
          <option value="">Selecciona un género</option>

          {(genders??[]).map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label>Email</Label>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="space-y-2">
        <Label>Contraseña</Label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading || !genderId}>
        {isLoading ? 'Guardando...' : 'Guardar'}
      </Button>
    </form>
  )
}