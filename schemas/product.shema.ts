import { z } from 'zod'

export const createProductSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),

  description: z.string().optional(),

  price: z.coerce.number().positive('El precio debe ser mayor que 0'),

  categoryId: z
      .number()
      .min(1, 'Debe seleccionar una categoría'),
    productImage: z.instanceof(File).optional()
  })

export type CreateProductInput = z.input<typeof createProductSchema>
export type CreateProduct = z.output<typeof createProductSchema>