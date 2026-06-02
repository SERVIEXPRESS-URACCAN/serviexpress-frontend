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
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

type Props = Readonly<{
  client: Clients
}>

type RowProps = Readonly<{
  label: string
  value: string
}>


function getInitials(name: string, lastName: string) {
  return `${name[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase()
}

export function ClientProfileCard({ client }: Props) {
  const isActive = client.user.status ?? false
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col items-center gap-4">
        <Avatar className="h-40 w-40">
          <AvatarImage
            src={
              client.profileImage
                ? `${API_IMAGE_URL}/profile/${client.profileImage}`
                : undefined
            }
            alt={`${client.name} ${client.lastName}`}
          />
          <AvatarFallback className="bg-yellow-200 text-yellow-700 text-3xl font-bold">
            {getInitials(client.name, client.lastName)}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col items-center gap-2">
          <CardTitle className="text-center">
            {client.user.email}
          </CardTitle>

          <Badge variant={isActive ? 'default' : 'destructive'}>
            {isActive ? 'Activo' : 'Inactivo'}
          </Badge>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="space-y-4 pt-4">
  <div className="space-y-2">
    <Label className="text-base font-semibold">Nombre</Label>
    <Input value={client.name} readOnly/>
  </div>

  <div className="space-y-2">
    <Label className="text-base font-semibold">Apellido</Label>
    <Input value={client.lastName} readOnly />
  </div>

  <div className="space-y-2">
    <Label className="text-base font-semibold">Teléfono</Label>
    <Input value={client.cellphone} readOnly />
  </div>

  <div className="space-y-2">
    <Label className="text-base font-semibold">Género</Label>
    <Input
      value={client.gender?.name ?? 'No definido'}
      readOnly
    />
  </div>
</CardContent>
    </Card>
  )
}

function Row({
  label,
  value
}: RowProps){

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