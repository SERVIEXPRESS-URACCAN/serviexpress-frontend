import { Clients } from '@/types/clients'
import { ClientProfileCard } from './client-profile-card'

type Props = {
  client: Clients
}

export function ClientDetail({ client }: Props) {
  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <ClientProfileCard client={client} />

      <div>
      </div>
    </div>
  )
}