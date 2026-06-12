import { auth } from '@/auth'
import { getBusinessById } from '@/services/business.service'
import { getProductsByBusiness } from '@/services/products.service'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { BusinessProducts } from '@/components/admin/business/business-products'
import { getCategoryProducts } from '@/services/categories-products.service'

export default async function BusinessDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ page?: string; search?: string }>
}) {
  const { id } = await params
  const sp = await searchParams
  const currentPage = Number(sp.page) || 1
  const search = sp.search || ''
  const session = await auth()

  const { data: business } = await getBusinessById(
    session!.accessToken,
    Number(id),
  )
  const products = await getProductsByBusiness(
    session!.accessToken,
    Number(id),
    currentPage,
    search,
  )
  const categoriesResult = await getCategoryProducts()

  return (
    <div className='space-y-8'>
      <div className='flex items-center gap-3'>
        <Button variant='ghost' asChild>
          <Link href='/admin/business'>
            <ArrowLeft className='size-4' />
          </Link>
        </Button>
        <h1 className='text-xl font-bold'>Detalle del Negocio</h1>
      </div>

      <div className='grid grid-cols-[450px_1fr] gap-6 items-start'>
        <Card className='h-full'>
          <CardHeader>
            <CardTitle className='text-lg font-bold uppercase tracking-wide'>
              Información del Negocio
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            {[
              { label: 'Nombre', value: business.name },
              { label: 'Teléfono', value: business.phone },
              { label: 'Dirección', value: business.address },
              { label: 'Ciudad', value: business.city?.name },
              { label: 'Descripción', value: business.description },
            ].map(({ label, value }) => (
              <div key={label}>
                <label className='text-xl font-bold block'>{label}</label>
                <input
                  value={value ?? '-'}
                  disabled
                  className='w-full rounded-md border px-3 py-1.5 text-lg bg-muted cursor-not-allowe'
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <BusinessProducts
          products={products}
          currentPage={currentPage}
          businessId={business.id}
          categories={categoriesResult.data}
        />
      </div>
    </div>
  )
}
