import { CategoriesProductsTable } from "@/components/admin/categories-products.ts";
import { CategoryProductSearch } from "@/components/admin/categories-products.ts/categories-product-search";
import { CreateCategoryProductDialog } from "@/components/admin/categories-products.ts/create-categories-products-dialog";
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Categorías de Productos</h1>
        </div>
        <CreateCategoryProductDialog />
      </div>
      <CategoryProductSearch />

      <CategoriesProductsTable
        categoryProduct={categoryProducts}
        currentPage={currentPage}
      />
    </div>
  );
}
