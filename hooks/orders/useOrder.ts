'use client'

import { useCallback, useEffect, useState } from 'react'

import { getOrderById } from '@/services/orders.service'

import { Order } from '@/types/order.type'

export const useOrder = (id: number) => {
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)


  const fetchOrder = useCallback(async () => {
    if (!id) return

    try {
      setLoading(true)

      const response = await getOrderById(id)

      setOrder(response)
    }
    catch (err) {
      setError (err instanceof Error? err: new Error('error inesperado'))
    }
    finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOrder()
  }, [fetchOrder])

  return {
    order,
    loading,
    fetchOrder,
    error
  }
}
