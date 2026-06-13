import { InfoField } from '@/components/shared/Info-field'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Owner } from '@/types/owner.types'

type Props = {
  owner: Owner
}

export const OwnerInfo = ({ owner }: Props) => {
  return (
    <Card className="w-ful">
      {' '}
      <CardHeader>
        <CardTitle className="text-lg font-bold uppercase tracking-wide">
          Información Personal
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <InfoField label="Nombre" value={owner.user?.profile?.name} />

        <InfoField label="Apellido" value={owner.user?.profile?.lastName} />

        <InfoField label="Teléfono" value={owner.user?.profile?.cellphone} />

        <InfoField label="Email" value={owner.user?.email} />

        <InfoField label="Género" value={owner.user?.profile?.gender?.name} />
      </CardContent>
    </Card>
  )
}
