'use client'

import { useParams } from 'next/navigation'

import { ClientDetail } from '@/components/admin/clients/clientProfile/client-detail'
import { useClient } from '@/hooks/useClient'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Loading from '../loading'

export default function ClientPage() {
  const params = useParams()

  const id = Number(params.id)

  const { client, loading } = useClient(id)

  if (loading || !client) {
    return <Loading/>
  }

 return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" asChild>
          <Link href="/admin/clients">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>

        <h1 className="text-xl font-bold">
          Detalle del Cliente
        </h1>
      </div>

      <ClientDetail client={client} />
    </div>
  )
}