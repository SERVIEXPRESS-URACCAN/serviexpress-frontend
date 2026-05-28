'use client'

import { useEffect, useState } from 'react'

import { getGenders } from '@/services/genders.service'

import { Gender } from '@/types/gender.type'

export const useGenders = (token: string) => {
  const [genders, setGenders] =
    useState<Gender[]>([])

  const [loading, setLoading] =
    useState(true)

  const fetchGenders = async () => {
    if (!token) return

    try {
      const response = await getGenders(token)

      setGenders(response)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGenders()
  }, [token])

  return {
    genders,
    loading,
    fetchGenders
  }
}