'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { API_IMG_URL } from '@/config/config'
import { Mandadero } from '@/types/mandadero.type'
import { PreviewImage } from './preview-image'

type Props = {
  mandadero: Mandadero
}

export const MandaderoImages = ({ mandadero }: Props) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {' '}
      <Card className="overflow-hiddens">
        <CardHeader className="border-b bg-muted/30">
          <CardTitle className="text-sm font-bold uppercase tracking-wide">
            Licencia de Conducir
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center py-2">
          {' '}
          {mandadero.imageIdentification ? (
            <PreviewImage
              src={`${API_IMG_URL}/uploads/mandaderos/${mandadero.imageIdentification}`}
              alt="Identificación"
            />
          ) : (
            <p className="text-sm text-muted-foreground">Sin imagen</p>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold uppercase tracking-wide">
            Tarjeta de circulación
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center py-2">
          {mandadero.motorcycle?.circulationImage ? (
            <PreviewImage
              src={`${API_IMG_URL}/uploads/motorcycles/${mandadero.motorcycle.circulationImage}`}
              alt="Circulación"
            />
          ) : (
            <p className="text-sm text-muted-foreground">Sin imagen</p>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold uppercase tracking-wide">
            Seguro
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center py-2">
          {mandadero.motorcycle?.insuranceImage ? (
            <PreviewImage
              src={`${API_IMG_URL}/uploads/motorcycles/${mandadero.motorcycle.insuranceImage}`}
              alt="Seguro"
            />
          ) : (
            <p className="text-sm text-muted-foreground">Sin imagen</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
