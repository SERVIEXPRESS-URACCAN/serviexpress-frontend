'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { MandaderoInfo } from '@/components/admin/mandadero/details/mandadero-info'
import { MandaderoPerfil } from '@/components/admin/mandadero/details/mandadero-perfil'
import { MandaderoImages } from '@/components/admin/mandadero/details/mandadero-images'
import { MandaderoMotorcycle } from '@/components/admin/mandadero/details/mandadero-moto'
import { useParams } from 'next/navigation'
import { useMandadero } from '@/hooks/useMandadero'
import Loading from '../loading'

export default  function MandaderoDetailPage() {
  const param = useParams()
  const id = Number(param.id)
  const { mandadero, loading } = useMandadero(id)
  
  if (loading || !mandadero) {
    return <Loading />
  }
  

  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-3'>
        <Button variant='ghost' asChild>
          <Link href='/admin/mandaderos'>
            <ArrowLeft className='size-4' />
          </Link>
        </Button>
        <h1 className='text-xl font-bold'>Detalle del Mandadero</h1>
      </div>

      <div className=' space-y-8'>
        <div className='grid grid-cols-[350px_1fr_1fr] gap-4 items-start'>
          <MandaderoPerfil mandadero={mandadero} />
          <MandaderoInfo mandadero={mandadero} />
          <MandaderoMotorcycle mandadero={mandadero} />
        </div>
        <MandaderoImages mandadero={mandadero} />
      </div>
    </div>
  )
}
