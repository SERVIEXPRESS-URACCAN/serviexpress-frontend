import { auth } from '@/auth'
import { getOwnerById } from '@/services/owner.service'
import { Button } from '@/components/ui/button'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { OwnerInfo } from '@/components/admin/owners/details/owner-info'
export default async function OwnerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const session = await auth()
  const owner = await getOwnerById(session!.accessToken, id)

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
        <OwnerInfo owner={owner} />
      </div>
    </div>
  )
}
