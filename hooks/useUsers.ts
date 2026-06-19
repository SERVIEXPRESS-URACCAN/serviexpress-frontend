'use client'

import { useEffect, useState, useCallback } from 'react'
import { getUsers } from '@/services/users.service'
import { User } from '@/types/user.type'

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const limit = 10

  const fetchUsers = useCallback(async () => {
    setLoading(true)

    try {
      const response = await getUsers(page, limit)

      setUsers(response.data)
      setTotalPages(response.pagination.lastPage)
      setError(null)
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error('Error inesperado')
      )
    } finally {
      setLoading(false)
    }
  }, [page])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsers()
  }, [fetchUsers])

  return {
    users,
    loading,
    error,
    page,
    totalPages,
    setPage,
    fetchUsers,
  }
}