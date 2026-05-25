export type CategoryProduct = {
  id: number
  name: string
  createdAt: string
  updatedAt: string
}
export type CategoryProductResponse = {
  data: CategoryProduct[]
  pagination: {
    total: number
    page: number
    limit: number
    lastPage: number
    hasNextPage: boolean
  }
}

export type CreateCategoryProductDto = {
  name: string
}

export type UpdateCategoryProductDto = {
  name?: string
}

export type DeleteCategoryProductDto = {
  id: number
}