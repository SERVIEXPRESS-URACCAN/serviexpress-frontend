'use client'

import { useEffect, useState } from 'react'

import { useAuth } from '@/hooks/useAuth'
import { getUsers } from '@/services/users.service'

type User = {
  id: number
  email: string
}

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([])

  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(1)

  const [totalPages, setTotalPages] = useState(0)

  const limit = 10

  const { session } = useAuth()

  const token = session?.accessToken ?? ''

  const fetchUsers = async () => {
    if (!token) return

    try {
      const response = await getUsers(token, page, limit)

      setUsers(response.data)

      setTotalPages(response.pagination.lastPage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [token, page])

  return {
    users,
    loading,
    page,
    totalPages,
    setPage,
    fetchUsers
  }
}
