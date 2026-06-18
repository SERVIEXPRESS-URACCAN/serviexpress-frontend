'use client'

import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import { getOrders } from '@/services/orders.service'
import { OrderResponse } from '@/types/order.type'

export const useOrders = () => {
  const [orders, setOrders] = useState<OrderResponse | null>(null)
  const [loading, setLoading] = useState(true)

  const searchParams = useSearchParams()
  const search = searchParams.get('search') || undefined
  const page = Number(searchParams.get('page')) || 1

  const [error, setError] = useState<Error | null>(null)

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true)

      const response = await getOrders(page, 10, search)

      setOrders(response)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('error inesperado'))
    } finally {
      setLoading(false)
    }
  }, [search, page])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOrders()
  }, [fetchOrders])

  return {
    orders,
    loading,
    fetchOrders,
    error,
  }
}
