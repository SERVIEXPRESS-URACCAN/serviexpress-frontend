import { ClientesTable } from '@/components/admin/clients/clients-table'
import { getClientes } from '@/services/clients.service'
import { auth } from '@/auth'

type Props = Readonly<{
  searchParams: Promise<{ page?: string }>
}>

export default async function ClientesPage({ searchParams }: Props) {
  const { page } = await searchParams
  const currentPage = Number(page) || 1

  const session = await auth()
  const token = session?.accessToken ?? ''

  const clientsData = await getClientes(token, currentPage)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Clientes</h1>
        </div>
      </div>
      <ClientesTable
        clientsData={clientsData}
        currentPage={currentPage}
      />
    </div>
  )
}