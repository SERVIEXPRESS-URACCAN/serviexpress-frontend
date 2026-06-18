

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TablePaginationInput } from '@/components/shared/table-pagination'
import { SearchInput } from '@/components/shared/search-input'
import { ProductResponse } from '@/types/products.type'
import { CategoryProduct } from '@/types/categories-products'
import { CreateProductAdminDialog } from '../product/create-product-admin-dialog'
import { ProductActions } from '../product/products-action'

type Props = {
  products: ProductResponse
  currentPage: number
  businessId: number
  categories: CategoryProduct[]
  refreshAction?: ()=> Promise<void>
}

export const BusinessProducts = ({
  products,
  currentPage,
  businessId,
  categories,
  refreshAction
}: Props) => {
  const { pagination } = products

  return (
    <Card className='h-full'>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle className='text-lg font-bold uppercase tracking-wide'>
          Productos
        </CardTitle>
        <div className='flex items-center gap-2'>
          <SearchInput placeholder='Buscar producto...' className='w-64' />
          <CreateProductAdminDialog
            businessId={businessId}
            categories={categories}
            refreshAction={refreshAction}
          />
        </div>
      </CardHeader>
      <CardContent className='flex flex-col h-full'>
        <div className='rounded-md border overflow-x-auto flex-1'>
          <Table className='text-base'>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className='h-24 text-center'>
                    No hay productos registrados
                  </TableCell>
                </TableRow>
              ) : (
                products.data.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.description ?? '-'}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>
                      {product.categories?.map((c) => c.name).join(', ') ?? '-'}
                    </TableCell>
                    <TableCell>
                      {product.status ? (
                        <span className='text-green-600 font-medium'>
                          Activo
                        </span>
                      ) : (
                        <span className='text-red-400 font-medium'>
                          Inactivo
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <ProductActions
                        product={product}
                        categories={categories}
                        refreshAction={refreshAction}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <div className='flex items-center justify-between px-2 mt-4'>
          <p className='text-sm text-muted-foreground'>
            Página {currentPage} de {pagination.lastPage}
          </p>
          <TablePaginationInput
            currentPage={currentPage}
            lastPage={pagination.lastPage}
          />
        </div>
      </CardContent>
    </Card>
  )
}
