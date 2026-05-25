export type City = {
  id: number
  name: string
  createdAt: string
  updatedAt: string
}

export type CreateCityDto = {
  name: string
}

export type UpdateCityDto = {
  name?: string
}
