'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type Props = {
  defaultValues?: {
    name: string
  }

  onSubmitAction: (data: { name: string }) => Promise<void>

  isLoading?: boolean
}

export const CategoryProductForm = ({
  defaultValues,
  onSubmitAction,
  isLoading
}: Props) => {
  const [name, setName] = useState(defaultValues?.name || '')

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    await onSubmitAction({
      name
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
          placeholder="Nombre de la categoría del producto"
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Guardando...' : 'Guardar'}
      </Button>
    </form>
  )
}
