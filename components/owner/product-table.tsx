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

type Props = {
  products: ProductResponse
  currentPage: number
  refreshAction?: () => Promise<void>
}

export const ProductTable = ({ products, currentPage }: Props) => {
  const { pagination } = products

  return (
    <div className='space-y-4'>
      <div className='rounded-md border overflow-x-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Categorías</TableHead>
              <TableHead>Estado</TableHead>
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

                  <TableCell>C${product.price}</TableCell>

                  <TableCell>
                    {product.categories && product.categories.length > 0
                      ? product.categories
                          .map((category) => category.name)
                          .join(', ')
                      : '-'}
                  </TableCell>

                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        product.status
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400'
                          : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400'
                      }`}
                    >
                      {product.status ? 'Activo' : 'Inactivo'}
                    </span>
                  </TableCell>

                  <TableCell>Acciones</TableCell>
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
