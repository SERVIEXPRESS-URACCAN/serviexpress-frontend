'use client'
import { ClientesTable } from '@/components/admin/clients/clients-table'
import { CreateClientDialog } from '@/components/admin/clients/create-client-dialog'
import { useAuth } from '@/hooks/useAuth'
import { useClients } from '@/hooks/useClients'
import { useGenders } from '@/hooks/useGenders'

export default function ClientsPage() {
  const { session, isLoading: authLoading } = useAuth()

  const token = session?.accessToken ?? ''

  const {
    clients,
    loading,
    fetchClients,
  } = useClients()

  const { genders, loading: loadingGenders } = useGenders(token)

  const isLoading =
    authLoading || loading || loadingGenders

  if (isLoading || !clients) {
    return <p>Cargando...</p>
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Clientes</h1>

        <CreateClientDialog token={token} genders={genders} onCreatedAction={fetchClients}
        />
      </div>

      <ClientesTable
        clients={clients}
        currentPage={clients.pagination.page}
        genders={genders}
        onUpdated={fetchClients}

      />
    </div>
  )
}