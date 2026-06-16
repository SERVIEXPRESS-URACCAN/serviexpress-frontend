import { z } from 'zod'

export const createProductSchema = z.object({
  name: z.string().trim().min(2, 'El nombre debe tener al menos 2 caracteres'),
  description: z.string().trim().optional(),
  price: z.coerce.number().min(0, 'El precio debe ser mayor a 0'),
  categoryIds: z
    .array(z.number().min(1))
    .min(1, 'Selecciona al menos una categoría'),
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
  categoryIds: z.array(z.number()).optional(),
  status: z.boolean().optional(),
  image: z.instanceof(File).optional(),
})
export type CreateProductInput = z.input<typeof createProductSchema>
export type CreateProduct = z.output<typeof createProductSchema>

export type UpdateProductInput = z.input<typeof updateProductSchema>
export type UpdateProduct = z.output<typeof updateProductSchema>
