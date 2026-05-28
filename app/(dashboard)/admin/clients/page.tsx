'use client'

import { ClientesTable } from '@/components/admin/clients/clients-table'

import { useClientes } from '@/hooks/useClients'
import { useAuth } from '@/hooks/useAuth'
import { useGenders } from '@/hooks/useGenders'

export default function ClientsPage() {
  const { session } = useAuth()

  const token = session?.accessToken ?? ''

  const {
    clientes,
    loading,
    page,
    totalPages,
    fetchClientes
  } = useClientes(token)

  const { genders } = useGenders(token)

  if (loading) {
    return <p>Cargando...</p>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Clientes
        </h1>
      </div>

      <ClientesTable
        clients={clientes}
        currentPage={page}
        totalPages={totalPages}
        genders={genders}
        onUpdated={fetchClientes}
      />
    </div>
  )
}