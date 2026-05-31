'use client'

import { useState } from 'react'

import { updateOwner } from '@/services/owner.service'

import { UpdateOwner } from '@/schemas/owner.schema'

export const useUpdateOwner = () => {
  const [isLoading, setIsLoading] = useState(false)

  const execute = async (ownerId: number, data: UpdateOwner, token: string) => {
    try {
      setIsLoading(true)

      await updateOwner(ownerId, data, token)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    execute,
    isLoading
  }
}
