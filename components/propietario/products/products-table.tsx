import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Product } from '@/types/products.type'
type Props = {
  products: Product[]
}

export const ProductsTable = ({ products }: Props) => {
  return (
    <Card className='w-full max-w-4xl'>
      {' '}
      <CardHeader>
        <CardTitle className='text-lg font-bold uppercase tracking-wide'>
          Productos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='rounded-md border overflow-x-auto'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length > 0 ? (
                products.map((product: Product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.description ?? '-'}</TableCell>
                    <TableCell>C${product.price}</TableCell>
                    <TableCell>{product.category.name}</TableCell>
                                      <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${product.status
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                        }`}
                    >
                      {product.status
                        ? 'Disponible'
                        : 'Agotado'}
                    </span>
                  </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className='text-center text-muted-foreground'
                  >
                    No hay productos registrados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
