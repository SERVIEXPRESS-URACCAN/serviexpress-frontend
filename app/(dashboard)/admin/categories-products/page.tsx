import { CategoriesProductsTable } from "@/components/admin/categories-products.ts";
import { CreateCategoryProductDialog } from "@/components/admin/categories-products.ts/create-categories-products-dialog";
import { SearchInput } from "@/components/shared/search-input";
import { getCategoryProducts } from "@/services/categories-products.service";

export default async function CategoryProductPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const params = await searchParams;

  const currentPage = Number(params.page) || 1;
  const search = params.search || "";
  const categoryProducts = await getCategoryProducts(currentPage, search);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Categorías de Productos</h1>
      <div className="flex items-center justify-between">
        <SearchInput
          placeholder="Buscar categoría de producto..."
          className="w-full max-w-6xl"
        />
        <CreateCategoryProductDialog />
      </div>

      <CategoriesProductsTable
        categoryProduct={categoryProducts}
        currentPage={currentPage}
      />
    </div>
  );
}
