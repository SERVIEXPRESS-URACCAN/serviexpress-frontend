import { InfoField } from '@/components/shared/Info-field'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Owner } from '@/types/owner.types'

type Props = {
  owner: Owner
}

export const OwnerBusiness = ({ owner }: Props) => {
  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="text-lg font-bold uppercase tracking-wide">
          Negocio
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {[
          { label: 'Razón Social', value: owner.razonSocial },
          { label: 'Nombre del Negocio', value: owner.business?.name }
        ].map((field) => (
          <InfoField
            key={field.label}
            label={field.label}
            value={field.value}
          />
        ))}
      </CardContent>
    </Card>
  )
}
