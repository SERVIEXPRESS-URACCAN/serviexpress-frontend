'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { BusinessProducts } from '@/components/admin/business/business-products'

import { API_IMG_URL } from '@/config/config'

import { useBusines } from '@/hooks/business/useBuesines'
import { useProductsByBusiness } from '@/hooks/business/useProductByBusines'

import { getCategoryProducts } from '@/services/categories-products.service'
import { CategoryProduct } from '@/types/categories-products'
import Loading from '../loading'

export default function BusinessDetailPage() {
  const params = useParams()
  const id = Number(params.id)

  const [currentPage] = useState(1)
  const [search] = useState('')
  const [categories, setCategories] = useState<CategoryProduct[]>([])

  const { busines, loading: businessLoading } = useBusines(id)

  const {
    products,
    loading: productsLoading,
    error,
    fetchProducts
  } = useProductsByBusiness(
    id,
    currentPage,
    search,
  )

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const result = await getCategoryProducts()
        setCategories(result.data)
      } catch (error) {
        console.error('Error cargando categorías:', error)
      }
    }

    loadCategories()
  }, [])

  if (businessLoading || productsLoading) {
    return <Loading/>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className='space-y-4'>
      <div className='flex items-center gap-3'>
        <Button variant='ghost' asChild>
          <Link href='/admin/business'>
            <ArrowLeft className='size-4' />
          </Link>
        </Button>

        <h1 className='text-xl font-bold'>
          Detalle del Negocio
        </h1>
      </div>

      <div className='grid grid-cols-[450px_1fr] gap-6 items-start'>
        <Card className='h-full'>
          <CardHeader>
            <div className='w-full h-32 bg-muted rounded-t-xl overflow-hidden'>
              {busines?.bannerImage ? (
                <Image
                  src={`${API_IMG_URL}/uploads/business/${busines.bannerImage}`}
                  alt='Banner'
                  width={800}
                  height={200}
                  unoptimized
                  className='w-full h-full object-cover'
                />
              ) : (
                <div className='w-full h-full bg-muted flex items-center justify-center'>
                  <p className='text-sm text-muted-foreground'>
                    Sin banner
                  </p>
                </div>
              )}
            </div>

            <div className='px-4 -mt-8 mb-2 flex justify-center'>
              <div className='w-30 h-30 rounded-full border-4 border-background bg-muted overflow-hidden'>
                {busines?.logoImage ? (
                  <Image
                    src={`${API_IMG_URL}/uploads/business/${busines.logoImage}`}
                    alt='Logo'
                    width={120}
                    height={120}
                    unoptimized
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <div className='w-full h-full flex items-center justify-center'>
                    <p className='text-xs text-muted-foreground'>
                      Logo
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className='space-y-6'>
            {[
              {
                label: 'Nombre',
                value: busines?.name,
              },
              {
                label: 'Teléfono',
                value: busines?.phone,
              },
              {
                label: 'Dirección',
                value: busines?.address,
              },
              {
                label: 'Ciudad',
                value: busines?.city?.name,
              },
              {
                label: 'Descripción',
                value: busines?.description,
              },
            ].map(({ label, value }) => (
              <div key={label}>
                <label className='text-lg font-semibold block mb-2'>
                  {label}
                </label>

                <input
                  value={value ?? '-'}
                  disabled
                  readOnly
                  className='w-full rounded-md border px-3 py-2 bg-muted'
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {products && (
          <BusinessProducts
            products={products}
            currentPage={currentPage}
            businessId={id}
            categories={categories}
            refreshAction={fetchProducts}
          />
        )}
      </div>
    </div>
  )
}