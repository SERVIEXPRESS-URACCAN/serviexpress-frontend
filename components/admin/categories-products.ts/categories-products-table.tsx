'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CategoryProductResponse } from "@/types/categories-products";
import { CategoryProductActions } from "./categories-products-actions";
import { TablePaginationInput } from "@/components/shared/table-pagination";
type Props = {
  categoryProduct: CategoryProductResponse;
  currentPage: number;
  refreshAction?: () => Promise<void>

};

export const CategoriesProductsTable = ({
  categoryProduct,
  currentPage,                                                   
  refreshAction                         
}: Props) => {
  const { pagination } = categoryProduct;

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
                    <CategoryProductActions
                      categoryProduct={cat}
                      refreshAction={refreshAction}/>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-2">
        <p className="text-sm text-muted-foreground whitespace-nowrap">
          Página {currentPage} de {pagination.lastPage}
        </p>
        <TablePaginationInput
          currentPage={currentPage}
          lastPage={pagination.lastPage}
        />
      </div>
    </div>
  );
};
