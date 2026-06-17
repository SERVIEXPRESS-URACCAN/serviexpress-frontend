'use client'

import { useState } from 'react'

import { CreateOwner } from '@/schemas/owner.schema'
import { createOwner } from '@/services/owner.service'

export const useCreateOwner = () => {
  const [isLoading, setIsLoading] = useState(false)

  const execute = async (data: CreateOwner, token: string) => {
    try {
      setIsLoading(true)

      await createOwner(data, token)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    execute,
    isLoading
  }
}
