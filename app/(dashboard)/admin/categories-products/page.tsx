import { CategoriesProductsTable, } from "@/components/admin/categories-products.ts"
import { CreateCategoryProductDialog } from "@/components/admin/categories-products.ts/create-categories-products-dialog"
import { getCategoryProducts } from "@/services/categories-products"

export default async function CategoryProductPage() {
  const categoryProducts = await getCategoryProducts()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Categorías de Productos</h1>
        </div>

        <CreateCategoryProductDialog />
      </div>

      <CategoriesProductsTable categoryProduct={categoryProducts} />
    </div>
  )
}
