import z from 'zod'

export const createOwnerSchema = z.object({
  razonSocial: z
    .string()
    .trim()
    .min(1, 'La razón social no puede estar vacía')
    .nullable(),
  user: z.coerce.number().min(1, 'El usuario es requerido'),
  identificationCardImage: z.instanceof(File, {
    message: 'La imagen es requerida'
  }),
  business: z.object({
    name: z.string().trim().min(1, 'El nombre del negocio es requerido'),
    address: z.string().trim().min(1, 'La dirección es requerida'),
    phone: z
      .string()
      .trim()
      .regex(/^\d{8}$/, 'El teléfono debe tener 8 dígitos'),
    city: z.coerce.number().min(1, 'La ciudad es requerida')
  })
})

export type CreateOwnerInput = z.input<typeof createOwnerSchema>

export type CreateOwner = z.output<typeof createOwnerSchema>

export const updateOwnerSchema = z.object({
  razonSocial: z
    .string()
    .trim()
    .min(1, 'la razon social no puede estar vacia')
    .optional(),

  profile: z.object({
    name: z.string().trim().min(1, 'El nombre es requerido'),

    lastName: z.string().trim().min(1, 'El apellido es requerido'),

    cellphone: z
      .string()
      .trim()
      .regex(/^\d{8}$/, 'El teléfono debe tener 8 dígitos'),
    genderId: z.coerce.number().min(1, 'El género es requerido')
  }),
  identificationCardImage: z.instanceof(File).optional()
})

export type UpdateOwnerInput = z.input<typeof updateOwnerSchema>
export type UpdateOwner = z.infer<typeof updateOwnerSchema>
