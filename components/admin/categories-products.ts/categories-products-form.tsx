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
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!name.trim()) {
      setError('El nombre es requerido')
      return
    }

    setError(null)
    await onSubmitAction({ name: name.trim() })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nombre</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            if (error) setError(null)
          }}
          placeholder="Nombre de la categoría del producto"
          disabled={isLoading}
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
      <Button type="submit" className="w-full" disabled={isLoading || !name.trim()}>
        {isLoading ? 'Guardando...' : 'Guardar'}
      </Button>
    </form>
  )
}