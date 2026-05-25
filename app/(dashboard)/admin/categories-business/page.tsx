import {
  CategoriesBusinessTable,
  CreateCategoryBusinessDialog,
} from "@/components/admin/categories-business.ts";

import { getCategoryBusiness } from "@/services/categories-business.service";

type Props = Readonly<{
  searchParams: Promise<{ page?: string }>;
}>;

export default async function CategoriesBusinessPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const categoriesBusiness = await getCategoryBusiness(currentPage);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Categorías de Negocios</h1>
        </div>
        <CreateCategoryBusinessDialog />
      </div>

      <CategoriesBusinessTable
        categoriesBusiness={categoriesBusiness}
        currentPage={currentPage}
      />
    </div>
  );
}
