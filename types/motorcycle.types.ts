export type MotorcycleBrand = {
  id: number
  name: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export type Motorcycle = {
  id: number
  licensePlate: string
  brand?: MotorcycleBrand
  model?: string
  color?: string
  circulationImage?: string
  insuranceImage?: string
  status: string
  createdAt: string
  updatedAt: string
}

export type CreateMotorcycleBrandDto = {
  name: string
}

export type UpdateMotorcycleBrandDto = {
  name?: string
}
