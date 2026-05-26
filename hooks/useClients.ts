'use client'
import { getClientes } from '@/services/clients.service'
import { Clients } from '@/types/clients'
import { useEffect, useState } from 'react'

export const useClientes = (token: string) => {
  const [clientes, setClientes] = useState<Clients[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const limit = 10

  useEffect(() => {
    if (!token) return

    const fetchClientes = async () => {
       setLoading(true)
      try {
        const data = await getClientes(token, page, limit)
        setClientes(data.data)
        setTotalPages(data.pagination.lastPage)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchClientes()
  }, [page, token])

  return {
    clientes,
    loading,
    page,
    totalPages,
    setPage
  }
}