'use client'

import { OwnerCirculationImage } from '@/components/admin/owners/details/owner-image'
import { OwnerInfo } from '@/components/admin/owners/details/owner-info'
import { Button } from '@/components/ui/button'
import { useOwner } from '@/hooks/owner/useOwner'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Loading from '../loading'
export default function OwnerDetailPage() {
  const params = useParams()
  const id = Number(params.id)
  const { owner, loading } = useOwner(id)
  if (loading || !owner) {
    return <Loading />
  }

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center gap-3">
        <Button variant="ghost" asChild>
          <Link href="/admin/propietarios">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-bold">Detalle del Propietario</h1>
      </div>

      <div className="flex justify-center gap-6 items-start">
        <div className="w-[450px]">
          <OwnerInfo owner={owner} />
        </div>

        <div className="w-[550px]">
          <OwnerCirculationImage owner={owner} />
        </div>
      </div>
    </div>
  )
}
