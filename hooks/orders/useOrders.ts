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

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true)

      const response = await getOrders(1, 10, search)

      setOrders(response)
    } finally {
      setLoading(false)
    }
  }, [search])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  return {
    orders,
    loading,
    fetchOrders
  }
}
