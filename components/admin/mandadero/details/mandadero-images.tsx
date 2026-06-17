'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { API_IMG_URL } from '@/config/config'
import { Mandadero } from '@/types/mandadero.type'
import Image from 'next/image'

type Props = {
  mandadero: Mandadero
}

export const MandaderoImages = ({ mandadero }: Props) => {
  return (
    <div className='grid grid-cols-3 gap-4'>
      <Card>
        <CardHeader className='pb-2'>
          <CardTitle className='text-sm font-bold uppercase tracking-wide'>
            Licencia de Conducir
          </CardTitle>
        </CardHeader>
        <CardContent className='flex justify-center py-2'>
          {' '}
          {mandadero.imageIdentification ? (
            <Image
              src={`${API_IMG_URL}/uploads/mandaderos/${mandadero.imageIdentification}`}
              alt='Identificación'
              width={300}
              height={250}
              unoptimized
              className='object-contain h-32 w-auto mx-auto'
            />
          ) : (
            <p className='text-sm text-muted-foreground'>Sin imagen</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='pb-2'>
          <CardTitle className='text-sm font-bold uppercase tracking-wide'>
            Tarjeta de circulación
          </CardTitle>
        </CardHeader>
        <CardContent className='flex justify-center py-2'>
          {mandadero.motorcycle?.circulationImage ? (
            <Image
              src={`${API_IMG_URL}/uploads/motorcycles/${mandadero.motorcycle.circulationImage}`}
              alt='Circulación'
              width={300}
              height={250}
              unoptimized
              className='object-contain h-32 w-auto mx-auto'
            />
          ) : (
            <p className='text-sm text-muted-foreground'>Sin imagen</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='pb-2'>
          <CardTitle className='text-sm font-bold uppercase tracking-wide'>
            Seguro
          </CardTitle>
        </CardHeader>
        <CardContent className='flex justify-center py-2'>
          {mandadero.motorcycle?.insuranceImage ? (
            <Image
              src={`${API_IMG_URL}/uploads/motorcycles/${mandadero.motorcycle.insuranceImage}`}
              alt='Seguro'
              width={300}
              height={250}
              unoptimized
              className='object-contain h-32 w-auto mx-auto'
            />
          ) : (
            <p className='text-sm text-muted-foreground'>Sin imagen</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
