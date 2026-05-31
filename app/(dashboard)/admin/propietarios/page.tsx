'use client'

import { OwnerTable } from '@/components/admin/owner/owner-table'

import { CreateOwnerDialog } from '@/components/admin/owner/create-owner-dialog'

import { useAvailableUsers } from '@/hooks/owner/useAvailableUsers'
import { useOwners } from '@/hooks/useOwner'

export default function OwnersPage() {
  const { owners, loading, fetchOwners } = useOwners()

  const { users, loading: usersLoading, fetchUsers } = useAvailableUsers()

  const handleCreated = async () => {
    await Promise.all([fetchOwners(), fetchUsers()])
  }

  if (loading || usersLoading) {
    return <p>Cargando...</p>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Propietarios</h1>

        <CreateOwnerDialog users={users} onCreatedAction={handleCreated} />
      </div>

      {owners && (
        <OwnerTable
          owners={owners}
          currentPage={owners.pagination.page}
          onUpdated={fetchOwners}
        />
      )}
    </div>
  )
}
