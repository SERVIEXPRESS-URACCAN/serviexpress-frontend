'use client'

import { useCallback, useEffect, useState } from 'react'

import { getBusinessOrders } from '@/services/owner/orders-owner.service'

import { OrderResponse } from '@/types/order.type'
import { useSearchParams } from 'next/navigation'

export const useOwnerOrders = () => {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page')) || 1
  const search = searchParams.get('search')?.trim() || undefined
  const status = searchParams.get('status') || undefined

  const [data, setData] = useState<OrderResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchOrders = useCallback(async () => {
    setLoading(true)

    try {
      const data = await getBusinessOrders(page, status, search)
      if (data) setData(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error inesperado'))
    } finally {
      setLoading(false)
    }
  }, [page, status, search])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOrders()
  }, [fetchOrders])

  return {
    data,
    loading,
    fetchOrders,
    error
  }
}
