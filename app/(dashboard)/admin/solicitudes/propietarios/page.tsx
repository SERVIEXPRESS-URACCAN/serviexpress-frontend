'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { OwnerApplicationTable } from '@/components/admin/solicitudes-owner/solicitudes-owner-table'
import { useOwnerApplications } from '@/hooks/use0wnerApplication'

export default function OwnerApplicationsPage() {
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const { applications, loading, error } = useOwnerApplications(currentPage)

  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-3'>
        <Button variant='ghost' asChild>
          <Link href='/admin/solicitudes'>
            <ArrowLeft className='size-4' />
          </Link>
        </Button>

        <h1 className='text-2xl font-bold'>Solicitudes de propietarios</h1>
      </div>

      {loading ? (
        <p>Cargando solicitudes...</p>
      ) : error ? (
        <p className='text-destructive'>{error.message}</p>
      ) : applications ? (
        <OwnerApplicationTable
          applications={applications}
          currentPage={currentPage}
        />
      ) : null}
    </div>
  )
}
