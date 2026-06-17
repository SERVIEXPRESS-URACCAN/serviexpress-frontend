'use client'

import { TablePaginationInput } from '@/components/shared/table-pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { CategoryProduct } from '@/types/categories-products'
import { ProductResponse } from '@/types/products.type'
import { ProductOwnerActions } from './products-action'

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
  onSuccessAction
}: Props) => {
  const { pagination } = products

  return (
    <div className="space-y-4">
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Categorías</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No hay productos registrados
                </TableCell>
              </TableRow>
            ) : (
              products.data.map((product) => {
                const isActive = product.status

                return (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>

                    <TableCell>{product.name}</TableCell>

                    <TableCell>{product.description}</TableCell>

                    <TableCell>C${product.price}</TableCell>

                    <TableCell>
                      {product.categories?.length
                        ? product.categories.map((c) => c.name).join(', ')
                        : '-'}
                    </TableCell>

                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-sm font-bold ${
                          isActive
                            ? 'bg-green-200 text-green-800'
                            : 'bg-red-200 text-red-600'
                        }`}
                      >
                        {isActive ? 'Activo' : 'Inactivo'}
                      </span>
                    </TableCell>

                    <TableCell>
                      <ProductOwnerActions
                        product={product}
                        categories={categories}
                        onSuccessAction={onSuccessAction}
                      />
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-2">
        <p className="text-sm text-muted-foreground">
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
