import {
  CategoriesBusinessTable,
  CreateCategoryBusinessDialog,
} from "@/components/admin/categories-business.ts";
import { CategoryBusinessSearch } from "@/components/admin/categories-business.ts/categories-business-search";
import { getCategoryBusiness } from "@/services/categories-business.service";

export default async function CategoriesBusinessPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const params = await searchParams;

  const currentPage = Number(params.page) || 1;
  const search = params.search || "";

  const categoriesBusiness = await getCategoryBusiness(currentPage, search);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Categorías de Negocios</h1>
      <div className="flex items-center justify-between">
        <CategoryBusinessSearch className="w-full max-w-6xl" />

        <CreateCategoryBusinessDialog />
      </div>

      <CategoriesBusinessTable
        categoriesBusiness={categoriesBusiness}
        currentPage={currentPage}
      />
    </div>
  );
}
