import z from 'zod'

export const updateBusinessSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').optional(),
  description: z.string().trim().optional(),
  address: z.string().trim().optional(),
  phone: z
    .string()
    .trim()
    .regex(/^\d{8}$/, 'Invalid phone number')
    .optional(),
  city: z.number().optional(),
  businessCategories: z.array(z.number()).optional(),
})

export type UpdateBusinessInput = z.infer<typeof updateBusinessSchema>
export type UpdateBusiness = z.output<typeof updateBusinessSchema>
