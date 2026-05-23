export type CategoryProduct = {
  id: number
  name: string
  createdAt: string
  updatedAt: string
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