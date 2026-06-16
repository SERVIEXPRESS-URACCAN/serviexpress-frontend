'use client'

import { useCallback, useEffect, useState } from 'react'

import { getOrderById } from '@/services/orders.service'

import { Order } from '@/types/order.type'

export const useOrder = (id: number) => {
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchOrder = useCallback(async () => {
    if (!id) return

    try {
      setLoading(true)

      const response = await getOrderById(id)

      setOrder(response)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchOrder()
  }, [fetchOrder])

  return {
    order,
    loading,
    fetchOrder
  }
}
