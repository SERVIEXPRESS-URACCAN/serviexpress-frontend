'use client'

import { useSearchParams } from 'next/navigation'
import { BusinessResponse } from '@/types/business.type'
import { useCallback, useEffect, useState } from 'react'
import { getBusinesses } from '@/services/business.service'

export const useBusiness = () => {

  const searchParams = useSearchParams()

  const search = searchParams.get('search') || ''
  const page = Number(searchParams.get('page')) || 1

  const [businesses, setBusinesses] = useState<BusinessResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)


  const refreshBusiness = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getBusinesses(page, search)
      if (data) setBusinesses(data)
      setError(null)
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Error inesperado')
      )
    } finally {
      setLoading(false)
    }
  }, [page, search])
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refreshBusiness()
  }, [refreshBusiness])
  return {
    businesses,
    loading,
    refreshBusiness,
    error,
  }
}
