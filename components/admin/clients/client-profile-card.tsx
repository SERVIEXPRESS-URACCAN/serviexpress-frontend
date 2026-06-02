import { Badge } from '@/components/ui/badge'
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/ui/avatar'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

import { Clients } from '@/types/clients'
import { API_IMAGE_URL } from '@/config/config'

type Props = {
  client: Clients
}

function getInitials(name: string, lastName: string) {
  return `${name[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase()
}

export function ClientProfileCard({ client }: Props) {
  const isActive = client.user.status ?? false
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage
            src={
              client.profileImage
                ? `${API_IMAGE_URL}/profile/${client.profileImage}`
                : undefined
            }
            alt={`${client.name} ${client.lastName}`}
          />
          <AvatarFallback>
            {getInitials(client.name, client.lastName)}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col items-center gap-2">
          <CardTitle className="text-center">
            {client.name} {client.lastName}
          </CardTitle>

          <Badge variant={isActive ? 'default' : 'secondary'}>
            {isActive ? 'Activo' : 'Inactivo'}
          </Badge>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="pt-4">
        <dl className="space-y-4">
          <Row
            label="Correo"
            value={client.user.email}
          />

          <Row
            label="Teléfono"
            value={client.cellphone}
          />

          <Row
            label="Género"
            value={client.gender?.name ?? 'No definido'}
          />

        </dl>
      </CardContent>
    </Card>
  )
}

function Row({
  label,
  value
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-muted-foreground">
        {label}
      </dt>

      <dd className="text-right font-medium">
        {value}
      </dd>
    </div>
  )
}