'use client'

import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Owner } from '@/types/owner.types'

type Props = {
  owner: Owner
}

const UPLOADS_URL = process.env.NEXT_PUBLIC_UPLOADS_URL

export const SolicitudOwnerDocuments = ({ owner }: Props) => {
  const imageUrl = owner.identificationCardImage
    ? `${UPLOADS_URL}/owners/${owner.identificationCardImage}`
    : null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Documentos del propietario</CardTitle>
      </CardHeader>

      <CardContent>
        {imageUrl ? (
          <a
            href={imageUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='block max-w-xl'
            title='Ver documento completo'
          >
            <Image
              src={imageUrl}
              alt='Documento de identificación del propietario'
              width={600}
              height={400}
              unoptimized
              className='h-auto w-full rounded-md border object-contain transition-opacity hover:opacity-80'
            />
          </a>
        ) : (
          <p className='text-sm text-muted-foreground'>
            No se adjuntó el documento de identificación.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
