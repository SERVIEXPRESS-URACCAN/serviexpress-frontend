'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { UpdateOwner } from '@/types/owner.types'

type Props = {
  defaultValues?: {
    razonSocial: string
    name: string
    lastName: string
    cellphone: string
  }

  onSubmitAction: (data: UpdateOwner) => Promise<void>
  isLoading?: boolean
}

export const OwnerForm = ({
  defaultValues,
  onSubmitAction,
  isLoading
}: Props) => {
  const [razonSocial, setRazonSocial] = useState(
    defaultValues?.razonSocial || ''
  )

  const [name, setName] = useState(defaultValues?.name || '')

  const [lastName, setLastName] = useState(defaultValues?.lastName || '')

  const [cellphone, setCellphone] = useState(defaultValues?.cellphone || '')

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    await onSubmitAction({
      razonSocial,
      name,
      lastName,
      cellphone
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nombre</Label>

        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="lastName">Apellido</Label>

        <Input
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Apellido"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cellphone">Teléfono</Label>

        <Input
          id="cellphone"
          value={cellphone}
          onChange={(e) => setCellphone(e.target.value)}
          placeholder="Teléfono"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="razonSocial">Razón Social</Label>

        <Input
          id="razonSocial"
          value={razonSocial}
          onChange={(e) => setRazonSocial(e.target.value)}
          placeholder="Razón social del owner"
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Guardando...' : 'Guardar'}
      </Button>
    </form>
  )
}
