'use client'
import { getClientes } from '@/services/clients.service'
import { Clientes } from '@/types/clients'
import { useEffect, useState } from 'react'

export const useClientes = (token: string) => {
  const [clientes, setClientes] = useState<Clientes[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const limit = 10

  useEffect(() => {
    const fetchClientes = async () => {
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