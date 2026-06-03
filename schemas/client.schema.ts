import { z } from 'zod'

export const createClientSchema = z.object({
email: z.string()
  .regex(/^[^\s@]+@gmail\.com$/, 'Solo se permiten correos de Gmail'),  password: z.string().min(8, 'La contraseña debe tener mínimo 8 caracteres'),

  profile: z.object({
    name: z.string().min(1, 'El nombre es requerido'),

    lastName: z.string().min(1, 'El apellido es requerido'),

    cellphone: z.string().trim().regex(/^\d{8}$/, 'El teléfono debe tener 8 dígitos'),

    gender_id: z.coerce.number().min(1, 'El género es requerido')             
  })
})

export type CreateUserDto = z.infer<typeof createClientSchema>

export type CreateUserInput = z.input<typeof createClientSchema>

export const updateClientProfileSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),

  lastName: z.string().min(1, 'El apellido es requerido'),

  cellphone: z.string().min(8, 'El teléfono es inválido'),
  
  status: z.coerce.boolean({ error: 'El estado es requerido' }),

  gender_id: z.coerce.number().min(1, {
    message: 'Seleccione un género'
  }),
  profileImage: z
    .custom<File>(
      (file) => file instanceof File,
      'Seleccione una imagen válida'
    )
    .optional()
    .nullable(),

  businessName: z
    .string()
    .min(1, 'El nombre del negocio es requerido')
    .optional()
})

export type UpdateClientProfileDto = z.infer<typeof updateClientProfileSchema>

export type UpdateClientProfileInput = z.input<typeof updateClientProfileSchema>
