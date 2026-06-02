'use client'

import { useParams } from 'next/navigation'

import { ClientDetail } from '@/components/admin/clients/client-detail'
import { useClient } from '@/hooks/useClient'

export default function ClientPage() {
  const params = useParams()

  const id = Number(params.id)

  const { client, loading } = useClient(id)

  if (loading || !client) {
    return <p>Cargando...</p>
  }

  return <ClientDetail client={client} />
}