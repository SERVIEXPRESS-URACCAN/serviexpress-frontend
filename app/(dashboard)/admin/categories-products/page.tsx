import { CategoriesProductsTable } from "@/components/admin/categories-products.ts"
import { CreateCategoryProductDialog } from "@/components/admin/categories-products.ts/create-categories-products-dialog"
import { getCategoryProducts } from "@/services/categories-products.service"

type Props = {
  searchParams: Promise<{ page?: string }>
}

export default async function CategoryProductPage({ searchParams }: Props) {
  const { page } = await searchParams
  const currentPage = Number(page) || 1
  const categoryProducts = await getCategoryProducts(currentPage)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Categorías de Productos</h1>
        </div>
        <CreateCategoryProductDialog />
      </div>
      <CategoriesProductsTable
        categoryProduct={categoryProducts}
        currentPage={currentPage}
      />
    </div>
  )
}