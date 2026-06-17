'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ProductResponse } from '@/types/products.type'
import { TablePaginationInput } from '@/components/shared/table-pagination'
import { ProductOwnerActions } from './products-action'
import { CategoryProduct } from '@/types/categories-products'

type Props = {
  products: ProductResponse
  categories: CategoryProduct[]
  currentPage: number
  onSuccessAction?: () => Promise<void>
}

export const ProductTable = ({
  products,
  currentPage,
  categories = [],
  onSuccessAction,
}: Props) => {
  const { pagination } = products

  return (
    <div className='space-y-4'>
      <div className='rounded-md border overflow-x-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Categorías</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className='h-24 text-center'>
                  No hay productos registrados
                </TableCell>
              </TableRow>
            ) : (
              products.data.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>

                  <TableCell>{product.name}</TableCell>

                  <TableCell>{product.description}</TableCell>

                  <TableCell>C${product.price}</TableCell>

                  <TableCell>
                    {product.categories && product.categories.length > 0
                      ? product.categories
                          .map((category) => category.name)
                          .join(', ')
                      : '-'}
                  </TableCell>

                  <TableCell>
                    <ProductOwnerActions
                      product={product}
                      categories={categories}
                      onSuccessAction={onSuccessAction}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className='flex items-center justify-between px-2'>
        <p className='text-sm text-muted-foreground'>
          Página {currentPage} de {pagination.lastPage}
        </p>

        <TablePaginationInput
          currentPage={currentPage}
          lastPage={pagination.lastPage}
        />
      </div>
    </div>
  )
}
