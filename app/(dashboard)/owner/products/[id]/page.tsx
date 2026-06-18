'use client'

import { useParams } from 'next/navigation'

import { useOwnerProduct } from '@/hooks/owner/useOwnerProduct'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function OwnerProductPage() {
  const params = useParams()

  const id = Number(params.id)

  const { product, loading } = useOwnerProduct(id)

  if (loading) {
    return <p>Cargando...</p>
  }

  if (!product) {
    return <p>Producto no encontrado</p>
  }

  return (
    <div>
      <Button variant='ghost' asChild>
        <Link href='/owner/pedidos'>
          <ArrowLeft className='size-4' />
        </Link>
      </Button>

      <h1>{product.name}</h1>
    </div>
  )
}
