'use client'

import { useState } from 'react'
import { CreateOwner } from '@/schemas/owner.schema'
import { createOwner } from '@/services/owner.service'

export const useCreateOwner = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const execute = async (data: CreateOwner) => {
    try {
      setIsLoading(true)
      setError(null)

      const result = await createOwner(data)

      return result
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Error inesperado')
      setError(error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    execute,
    isLoading,
    error,
  }
}