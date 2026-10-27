'use client'

import Image from 'next/image'
import type { Mandadero } from '@/types/mandadero.type'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type Props = {
  mandadero: Mandadero
}

const UPLOADS_URL = process.env.NEXT_PUBLIC_UPLOADS_URL

export const SolicitudDocuments = ({ mandadero }: Props) => {
  const motorcycle = mandadero.motorcycle

  const documents = [
    {
      title: 'Identificación',
      image: mandadero.imageIdentification,
      path: 'mandaderos',
      alt: 'Identificación del solicitante',
      emptyMessage: 'No se adjuntó la identificación.',
    },
    {
      title: 'Circulación de la motocicleta',
      image: motorcycle?.circulationImage,
      path: 'motorcycles',
      alt: 'Circulación de la motocicleta',
      emptyMessage: 'No se adjuntó la circulación.',
    },
    {
      title: 'Seguro de la motocicleta',
      image: motorcycle?.insuranceImage,
      path: 'motorcycles',
      alt: 'Seguro de la motocicleta',
      emptyMessage: 'No se adjuntó el seguro.',
    },
  ]

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>Datos de la motocicleta</CardTitle>
        </CardHeader>

        <CardContent>
          {motorcycle ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Marca</TableHead>
                  <TableHead>Modelo</TableHead>
                  <TableHead>Placa</TableHead>
                  <TableHead>Color</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                <TableRow>
                  <TableCell>{motorcycle.brand || 'No especificada'}</TableCell>
                  <TableCell>{motorcycle.model || 'No especificado'}</TableCell>
                  <TableCell className='font-medium'>
                    {motorcycle.licensePlate || 'No especificada'}
                  </TableCell>
                  <TableCell>{motorcycle.color || 'No especificado'}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ) : (
            <p className='text-sm text-muted-foreground'>
              No hay información de la motocicleta.
            </p>
          )}
        </CardContent>
      </Card>

      <div className='grid gap-6 md:grid-cols-3'>
        {documents.map((document) => (
          <Card key={document.title}>
            <CardHeader>
              <CardTitle className='text-base'>{document.title}</CardTitle>
            </CardHeader>

            <CardContent>
              {document.image ? (
                <a
                  href={`${UPLOADS_URL}/${document.path}/${document.image}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='block cursor-pointer'
                  title='Haz clic para ver la imagen completa'
                >
                  <Image
                    src={`${UPLOADS_URL}/${document.path}/${document.image}`}
                    alt={document.alt}
                    width={600}
                    height={400}
                    className='h-auto w-full rounded-md border object-contain transition-opacity hover:opacity-80'
                    unoptimized
                  />
                </a>
              ) : (
                <p className='text-sm text-muted-foreground'>
                  {document.emptyMessage}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
