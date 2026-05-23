'use client'

import { OwnerTable } from '@/components/admin/owner/owner-table'
import { useOwners } from '@/hooks/useOwner'

export default function OwnersPage() {
  const { owners, loading } = useOwners()

  if (loading) return <p>Cargando...</p>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Owners</h1>
      </div>

      <OwnerTable owners={owners} />
    </div>
  )
}
