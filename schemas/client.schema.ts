import { z } from 'zod'

export const createClientSchema = z.object({
  email: z
    .email('Correo inválido'),

  password: z
    .string()
    .min(8, 'La contraseña debe tener mínimo 6 caracteres'),

  profile: z.object({
    name: z
      .string()
      .min(1, 'El nombre es requerido'),

    lastName: z
      .string()
      .min(1, 'El apellido es requerido'),

    cellphone: z
      .string()
      .min(8, 'El teléfono es inválido'),

    gender_id: z.number().min(1,{
      message: 'Seleccione un género'
    })
  })
})