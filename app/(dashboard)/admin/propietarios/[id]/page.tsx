'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { OwnerInfo } from '@/components/admin/owners/details/owner-info'
import { useParams } from 'next/navigation'
import Loading from '../loading'
import { useOwner } from '@/hooks/owner/useOwner'
export default  function OwnerDetailPage() {
  const params = useParams()
  const id = Number(params.id)
  const { owners, loading } = useOwner(id)
  if (loading || !owners) {
    return <Loading/>
  }

  return (
    <div className='space-y-6 w-full'>
      <div className='flex items-center gap-3'>
        <Button variant='ghost' asChild>
          <Link href='/admin/propietarios'>
            <ArrowLeft className='size-4' />
          </Link>
        </Button>
        <h1 className='text-xl font-bold'>Detalle del Propietario</h1>
      </div>

      <div className='max-w-2xl mx-auto'>
        <OwnerInfo owner={owners} />
      </div>
    </div>
  )
}
