'use client'

import { getBusinessOrderById } from '@/services/owner/orders-owner.service'
import { Order } from '@/types/order.type'
import { useCallback, useEffect, useState } from 'react'

export const useOwnerOrder = (id: number) => {
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const fetchOrderOwner = useCallback(async () => {
    try {
      setLoading(true)

      const response = await getBusinessOrderById(id)

      setOrder(response)
    } catch (error) {
      setError(error instanceof Error ? error : new Error('Error inesperado'))
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOrderOwner()
  }, [fetchOrderOwner])

  return {
    order,
    loading,
    fetchOrderOwner,
    error,
  }
}
