'use client'

import { useState } from 'react'

import { FormError } from '@/components/shared/form-error'
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

export const CityForm = ({
  defaultValues,
  onSubmitAction,
  isLoading
}: Props) => {
  const [name, setName] = useState(defaultValues?.name || '')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setError('')

      await onSubmitAction({
        name
      })
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Ha ocurrido un error')
      }
    }
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

            if (error) {
              setError('')
            }
          }}
          placeholder="Nombre de la ciudad"
        />

        <FormError message={error} />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Guardando...' : 'Guardar'}
      </Button>
    </form>
  )
}
