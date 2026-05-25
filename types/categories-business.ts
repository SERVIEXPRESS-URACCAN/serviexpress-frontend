export type CategoryBusiness = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};
export type CategoryBusinessResponse = {
  data: CategoryBusiness[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    lastPage: number;
    hasNextPage: boolean;
  };
};

export type CreateCategoryBusinessDto = {
  name: string;
};

export type UpdateCategoryBusinessDto = {
  name?: string;
};

export type DeleteCategoryBusinessDto = {
  id: number;
};
