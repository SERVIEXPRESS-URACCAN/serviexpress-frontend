'use client'

import { OwnerTable } from '@/components/admin/owner/owner-table'

import { CreateOwnerDialog } from '@/components/admin/owner/create-owner-dialog'

import { useOwners } from '@/hooks/useOwner'
import { useUsers } from '@/hooks/useUsers'

export default function OwnersPage() {
  const { owners, loading, fetchOwners } = useOwners()

  const { users, loading: usersLoading } = useUsers()

  if (loading || usersLoading) {
    return <p>Cargando...</p>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Propietarios</h1>

        <CreateOwnerDialog users={users} onCreated={fetchOwners} />
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
