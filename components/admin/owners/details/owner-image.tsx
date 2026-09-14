'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { API_IMG_URL } from '@/config/config'
import { Owner } from '@/types/owner.types'
import { PreviewImage } from '../../mandadero/details/preview-image'

type Props = {
  owner: Owner
}

export const OwnerCirculationImage = ({ owner }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold uppercase tracking-wide">
          Identificacion del propietario
        </CardTitle>
      </CardHeader>

      <CardContent>
        {owner.identificationCardImage ? (
          <PreviewImage
            src={`${API_IMG_URL}/uploads/owners/${owner.identificationCardImage}`}
            alt="Tarjeta de circulación"
          />
        ) : (
          <div className="flex h-72 items-center justify-center rounded-lg border border-dashed">
            <span className="text-muted-foreground">Sin imagen</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
