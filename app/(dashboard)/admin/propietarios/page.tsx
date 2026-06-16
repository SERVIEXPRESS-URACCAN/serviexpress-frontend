'use client'

import { OwnerTable } from '@/components/admin/owners/owner-table'

import { CreateOwnerDialog } from '@/components/admin/owners/create-owner-dialog'

import { useAvailableUsers } from '@/hooks/owner/useAvailableUsers'
import { useOwners } from '@/hooks/useOwner'
import { SearchInput } from '@/components/shared/search-input'

export default function OwnersPage() {
  const { owners, loading, fetchOwners } = useOwners()

  const { users, loading: usersLoading, fetchUsers } = useAvailableUsers()

  const handleCreated = async () => {
    await Promise.all([fetchOwners(), fetchUsers()])
  }

  if (!owners || usersLoading) {
    return <p>Cargando...</p>
  }

  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-bold'>Propietarios</h1>
      <div className='flex items-center justify-between'>
        <SearchInput
          placeholder='Buscar propietario...'
          className='w-full max-w-6xl'
        />
        <CreateOwnerDialog users={users} onCreatedAction={handleCreated} />
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <OwnerTable
          owners={owners}
          currentPage={owners.pagination.page}
          onUpdated={fetchOwners}
        />
      )}
    </div>
  )
}
