import { useEffect, useState } from 'react'

import { getAvailableUsersForOwner } from '@/services/users.service'

import { User } from '@/types/user.type'
import { useAuth } from '../useAuth'

export const useAvailableUsers = () => {
  const { session } = useAuth()

  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  const fetchUsers = async () => {
    if (!session?.accessToken) return

    try {
      const result = await getAvailableUsersForOwner(session.accessToken)

      setUsers(result)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [session])

  return {
    users,
    loading,
    fetchUsers
  }
}
