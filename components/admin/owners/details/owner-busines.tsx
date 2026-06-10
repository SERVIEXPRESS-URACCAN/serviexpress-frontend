import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Owner } from '@/types/owner.types'

type Props = {
  owner: Owner
}

export const OwnerBusiness = ({ owner }: Props) => {
  return (
    <Card className='w-full max-w-4xl'>
      {' '}
      <CardHeader>
        <CardTitle className='text-lg font-bold uppercase tracking-wide'>
          Negocio
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-3'>
        {[
          { label: 'Razón Social', value: owner.razonSocial },
          { label: 'Nombre del Negocio', value: owner.business?.name },
        ].map(({ label, value }) => (
          <div key={label} className='space-y-1'>
            <label className='text-lg font-bold block'>{label}</label>
            <input
              value={value ?? '-'}
              disabled
              className='w-full rounded-md border px-4 py-2 text-base bg-muted'
            />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
