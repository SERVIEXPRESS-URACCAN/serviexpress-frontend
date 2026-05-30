import z from 'zod'

export const createOwnerSchema = z.object({
  razonSocial: z.string().trim().min(1, 'La razón social es requerida'),
  user: z.coerce.number().min(1, 'El usuario es requerido'),
  identificationCardImage: z.instanceof(File).optional(),
  business: z.object({
    name: z.string().trim().min(1, 'El nombre del negocio es requerido'),
    address: z.string().trim().min(1, 'La dirección es requerida'),
    phone: z.string().trim().min(1, 'El teléfono es requerido'),
    city: z.coerce.number().min(1, 'La ciudad es requerida')
  })
})

export type CreateOwnerInput = z.input<typeof createOwnerSchema>

export type CreateOwner = z.output<typeof createOwnerSchema>

export const updateOwnerSchema = z.object({
  razonSocial: z.string().trim().min(1, 'La razón social es requerida'),

  profile: z.object({
    name: z.string().trim().min(1, 'El nombre es requerido'),

    lastName: z.string().trim().min(1, 'El apellido es requerido'),

    cellphone: z.string().trim().min(1, 'El teléfono es requerido'),

    genderId: z.coerce.number().min(1, 'El género es requerido')
  })
})

export type UpdateOwnerInput = z.input<typeof updateOwnerSchema>
export type UpdateOwner = z.infer<typeof updateOwnerSchema>
