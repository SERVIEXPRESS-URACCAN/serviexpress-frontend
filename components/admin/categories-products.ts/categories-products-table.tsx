import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { CategoryProduct } from '@/types/categories-products'
import { CategoryProductActions } from './categories-products-actions'

type Props = {
  categoryProduct: CategoryProduct[]
}

export const CategoriesProductsTable = ({ categoryProduct }: Props) => {
  return (
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
          {categoryProduct.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center">
                No hay categorías de productos disponibles
              </TableCell>
            </TableRow>
          ) : (
            categoryProduct.map((cat) => (
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
  )
}
