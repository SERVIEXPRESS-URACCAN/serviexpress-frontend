import { z } from 'zod'

export const createProductSchema = z.object({
  name: z.string().trim().min(2, 'El nombre debe tener al menos 2 caracteres'),
  description: z.string().trim().optional(),
  price: z.coerce.number().min(0, 'El precio debe ser mayor a 0'),
  categoryId: z.coerce.number().min(1, 'La categoría es requerida'),
  businessId: z.coerce.number().min(1, 'El negocio es requerido'),
  image: z.instanceof(File).optional(),
})

export const updateProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .optional(),
  description: z.string().trim().optional(),
  price: z.coerce.number().min(0, 'El precio debe ser mayor a 0').optional(),
  categoryId: z.coerce.number().optional(),
  image: z.instanceof(File).optional(),
})
export type CreateProductInput = z.input<typeof createProductSchema>
export type CreateProduct = z.output<typeof createProductSchema>

export type UpdateProductInput = z.input<typeof updateProductSchema>
export type UpdateProduct = z.output<typeof updateProductSchema>
