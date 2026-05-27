'use client'

import { useEffect, useState } from 'react'

import { getClientes } from '@/services/clients.service'

import { Clients } from '@/types/clients'

export const useClientes = (token: string) => {
  const [clientes, setClientes] =
    useState<Clients[]>([])

  const [loading, setLoading] =
    useState(true)

  const [page, setPage] = useState(1)

  const [totalPages, setTotalPages] =
    useState(0)

  const limit = 10

  const fetchClientes = async () => {
    if (!token) return

    try {
      const response = await getClientes(
        token,
        page,
        limit
      )

      setClientes(response.data)

      setTotalPages(
        response.pagination.lastPage
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClientes()
  }, [token, page])

  return {
    clientes,
    loading,
    page,
    totalPages,
    setPage,
    fetchClientes
  }
}