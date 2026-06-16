'use client'

import { useCallback, useEffect, useState } from 'react'

import { useSearchParams } from 'next/navigation'
import { useAuth } from '../useAuth'
import { getBusinessOrders } from '@/services/owner/orders-owner.service'

import { OrderResponse } from '@/types/order.type'

export const useOwnerOrders = () => {
  const { session } = useAuth()

  const searchParams = useSearchParams()
  const search = searchParams.get('search') || undefined
  const page = Number(searchParams.get('page')) || 1
  const status = searchParams.get('status') || undefined

  const [data, setData] = useState<OrderResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchOrders = useCallback(async () => {
    if (!session?.accessToken) return
    setLoading(true)

    try {
      const data = await getBusinessOrders(page, status)
      if (data) setData(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error inesperado'))
    } finally {
      setLoading(false)
    }
  }, [session, page, status])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOrders()
  }, [fetchOrders])

  return {
    data,
    loading,
    fetchOrders,
    error,
  }
}
