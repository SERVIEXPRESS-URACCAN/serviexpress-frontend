'use client'

import { useSearchParams } from 'next/navigation'
import { useAuth } from './useAuth'
import { BusinessResponse } from '@/types/business.type'
import { useCallback, useEffect, useState } from 'react'
import { getBusinesses } from '@/services/business.service'

export const useBusiness = () => {
  const { session } = useAuth()

  const searchParams = useSearchParams()

  const search = searchParams.get('search') || ''
  const page = Number(searchParams.get('page')) || 1

  const [businesses, setBusinesses] = useState<BusinessResponse | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshBusiness = useCallback(async () => {
    if (!session?.accessToken) return

    try {
      setLoading(true)

      const data = await getBusinesses(session.accessToken, page, search)

      setBusinesses(data)
    } finally {
      setLoading(false)
    }
  }, [session?.accessToken, page, search])
  useEffect(() => {
    refreshBusiness()
  }, [refreshBusiness])
  return {
    businesses,
    loading,
    refreshBusiness,
  }
}
