'use client'
import { Clients } from '@/types/clients'
import { ClientProfileCard } from './client-profile-card'

type Props = {
  client: Clients
}

export function ClientDetail({ client }: Props) {
  return (
    <div className="min-h-screen flex justify-center items-start p-6">
      <div className="w-full max-w-2xl">
        <ClientProfileCard client={client} />
      </div>
    </div>
  )
}