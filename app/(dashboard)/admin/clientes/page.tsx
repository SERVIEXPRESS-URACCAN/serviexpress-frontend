'use client'
import { ClientesTable } from '@/components/admin/clients/clients-table'
import { useClientes } from '@/hooks/useClients'
import { useSession } from 'next-auth/react'

export default function ClientesPage() {
  const { data: session, status } = useSession()
  const token = session?.accessToken ?? ''

  const { clientes, loading, page, totalPages, setPage } = useClientes(token)

  if (status === 'loading' || loading) return <p>Cargando...</p>
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Clientes</h1>

      <ClientesTable
        clientes={clientes}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  )
}