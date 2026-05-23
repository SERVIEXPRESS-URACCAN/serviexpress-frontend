import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {  CategoryProductResponse } from '@/types/categories-products'
import { CategoryProductActions } from './categories-products-actions'
import { Button } from '@/components/ui/button'

type Props = {
  categoryProduct: CategoryProductResponse
  currentPage:number
}

export const CategoriesProductsTable = ({ categoryProduct, currentPage }: Props) => {
  const { pagination } = categoryProduct

return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead className="w-12.5"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categoryProduct.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  No hay categorías de productos disponibles
                </TableCell>
              </TableRow>
            ) : (
              categoryProduct.data.map((cat) => (
                <TableRow key={cat.id}>
                  <TableCell>{cat.id}</TableCell>
                  <TableCell>{cat.name}</TableCell>
                  <TableCell>
                    <CategoryProductActions categoryProduct={cat} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-2">
        <p className="text-sm text-muted-foreground">
          Página {currentPage} de {pagination.lastPage}
        </p>
        <div className="flex gap-2">
          <a href={`?page=${currentPage - 1}`}>
            <Button variant="outline" size="sm" disabled={currentPage <= 1}>
              Anterior
            </Button>
          </a>
          <a href={`?page=${currentPage + 1}`}>
            <Button variant="outline" size="sm" disabled={!pagination.hasNextPage}>
              Siguiente
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}
