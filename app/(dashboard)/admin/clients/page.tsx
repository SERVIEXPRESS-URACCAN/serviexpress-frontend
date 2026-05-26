import { ClientesTable } from '@/components/admin/clients/clients-table'
import { getClientes } from '@/services/clients.service'
import { auth } from '@/auth'
import { CreateClientDialog } from '@/components/admin/clients/create-client-dialog'
import { getGenders } from '@/services/genders.service'

type Props = Readonly<{
  searchParams: Promise<{ page?: string }>
}>

export default async function ClientsPage({ searchParams }: Props) {
  const { page } = await searchParams
  const currentPage = Number(page) || 1

  const session = await auth()
  const token = session?.accessToken ?? ''

  const clientsData = await getClientes(token, currentPage)
  const genders = await getGenders(token)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Clientes</h1>
        </div>
        <CreateClientDialog token={token} genders={genders} />
      </div>
      <ClientesTable
        clientsData={clientsData}
        currentPage={currentPage}
      />
    </div>
  )
}