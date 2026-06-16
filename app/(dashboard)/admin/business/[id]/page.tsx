import { auth } from '@/auth'
import { getBusinessById } from '@/services/business.service'
import { getProductsByBusiness } from '@/services/products.service'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import { BusinessProducts } from '@/components/admin/business/business-products'
import { getCategoryProducts } from '@/services/categories-products.service'
import { API_IMG_URL } from '@/config/config'
import Link from 'next/link'
import Image from 'next/image'
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
    <div className='space-y-4'>
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
            <div className='w-full h-32 bg-muted rounded-t-xl '>
              {' '}
              {business.bannerImage ? (
                <Image
                  src={`${API_IMG_URL}/uploads/business/${business.bannerImage}`}
                  alt='Banner'
                  width={800}
                  height={200}
                  unoptimized
                  className='w-full h-full object-cover'
                />
              ) : (
                <div className='w-full h-full bg-muted flex items-center justify-center'>
                  <p className='text-sm text-muted-foreground'>Sin banner</p>
                </div>
              )}
            </div>
            <div className='px-4 -mt-8 mb-2 flex justify-center'>
              <div className='w-30 h-30 rounded-full border-4 border-background bg-muted overflow-hidden'>
                {business.logoImage ? (
                  <Image
                    src={`${API_IMG_URL}/uploads/business/${business.logoImage}`}
                    alt='Logo'
                    width={64}
                    height={64}
                    unoptimized
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <div className='w-full h-full flex items-center justify-center'>
                    <p className='text-xs text-muted-foreground'>Logo</p>
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='grid grid-cols-2 gap-4'></div>
            {[
              { label: 'Nombre', value: business.name },
              { label: 'Teléfono', value: business.phone },
              { label: 'Dirección', value: business.address },
              { label: 'Ciudad', value: business.city?.name },
              { label: 'Descripción', value: business.description },
            ].map(({ label, value }) => (
              <div key={label}>
                <label className='text-xl font-bold block mb-2'>{label}</label>
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
