'use client'
import { ClientesTable } from '@/components/admin/clients/clients-table'
import { CreateClientDialog } from '@/components/admin/clients/create-client-dialog'
import { useAuth } from '@/hooks/useAuth'
import { useClients } from '@/hooks/useClients'
import { useGenders } from '@/hooks/useGenders'
import Loading from './loading'
import { SearchInput } from '@/components/shared/search-input'

export default function ClientsPage() {
  const { session, isLoading: authLoading } = useAuth()
  const { clients, loading, fetchClients } = useClients()
  const token = session?.accessToken ?? ''


  const { genders, loading: loadingGenders } = useGenders()

  const isLoading = authLoading || loading || loadingGenders

  if (authLoading || loadingGenders || !clients) {
    return <Loading />
  }

  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-bold'>Clientes</h1>
      <div className='flex items-center justify-between'>
        <SearchInput
          placeholder='Buscar cliente...'
          className='w-full max-w-6xl'
        />
        <CreateClientDialog
          token={token}
          genders={genders}
          onCreatedAction={fetchClients}
        />
      </div>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <ClientesTable
          clients={clients}
          currentPage={clients.pagination.page}
          genders={genders}
          onUpdatedAction={fetchClients}
        />
      )}
    </div>
  )
}
