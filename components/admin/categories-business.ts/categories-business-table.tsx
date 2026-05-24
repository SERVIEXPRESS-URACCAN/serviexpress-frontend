import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { CategoryBusinessResponse } from "@/types/categories-business";
import { CategoryBusinessActions } from "./categories-business-actions";
import { Button } from "@/components/ui/button";

type Props = {
  categoriesBusiness: CategoryBusinessResponse;
  currentPage: number;
};

export const CategoriesBusinessTable = ({
  categoriesBusiness,
  currentPage,
}: Props) => {
  const { pagination } = categoriesBusiness;
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
            {categoriesBusiness.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  No hay categorías de negocios disponibles
                </TableCell>
              </TableRow>
            ) : (
              categoriesBusiness.data.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.id}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    <CategoryBusinessActions categoryBusiness={category} />
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
            <Button
              variant="outline"
              size="sm"
              disabled={!pagination.hasNextPage}
            >
              Siguiente
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};
