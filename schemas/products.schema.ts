import { z } from 'zod'

const baseProductSchema = z.object({
  name: z.string().trim().min(2, 'El nombre debe tener al menos 2 caracteres'),
  description: z.string().trim().optional(),
  price: z.coerce.number().positive('El precio debe ser mayor a 0'),
  categoryIds: z
    .array(z.number().min(1))
    .min(1, 'Selecciona al menos una categoría'),
  image: z.instanceof(File).optional(),
  status: z.boolean().optional(),
})
export const createProductAdminSchema = baseProductSchema.extend({
  businessId: z.coerce
    .number()
    .int('Selecciona un negocio')
    .positive('Selecciona un negocio'),
})

export const updateProductAdminSchema = baseProductSchema.extend({
  businessId: z.coerce
    .number()
    .int('Selecciona un negocio')
    .positive('Selecciona un negocio'),
})

export const createProductOwnerSchema = baseProductSchema

export const updateProductOwnerSchema = baseProductSchema

export type CreateProductAdminInput = z.input<typeof createProductAdminSchema>
export type CreateProductAdmin = z.output<typeof createProductAdminSchema>

export type UpdateProductAdminInput = z.input<typeof updateProductAdminSchema>
export type UpdateProductAdmin = z.output<typeof updateProductAdminSchema>

export type CreateProductOwnerInput = z.input<typeof createProductOwnerSchema>
export type CreateProductOwner = z.output<typeof createProductOwnerSchema>

export type UpdateProductOwnerInput = z.input<typeof updateProductOwnerSchema>
export type UpdateProductOwner = z.output<typeof updateProductOwnerSchema>
