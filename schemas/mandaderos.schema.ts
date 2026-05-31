import { z } from "zod";

export const createMandaderoSchema = z.object({
  userId: z
    .number({ error: "Debes seleccionar un usuario" })
    .min(1, "Debes seleccionar un usuario"),
  name: z.string().trim().min(1, "El nombre es requerido"),
  lastName: z.string().trim().min(1, "El apellido es requerido"),
  cellphone: z.string().trim().min(1, "El teléfono es requerido"),
  licensePlate: z.string().trim().min(1, "La placa es requerida"),
  brand: z.string().optional(),
  model: z.string().optional(),
  color: z.string().optional(),
  imageIdentification: z.instanceof(File, {
    message: "La imagen de identificación es requerida",
  }),
  circulationImage: z.instanceof(File, {
    message: "La tarjeta de circulación es requerida",
  }),
  insuranceImage: z.instanceof(File, { message: "El seguro es requerido" }),
});

export type CreateMandaderoInput = z.input<typeof createMandaderoSchema>;
export type CreateMandadero = z.output<typeof createMandaderoSchema>;

export const updateMandaderoSchema = z.object({
  profile: z.object({
    name: z.string().trim().min(1, "El nombre es requerido"),
    lastName: z.string().trim().min(1, "El apellido es requerido"),
    cellphone: z.string().trim().min(1, "El teléfono es requerido"),
  }),

  available: z.boolean(),
  isActive: z.boolean(),

  motorcycle: z.object({
    licensePlate: z.string().trim().min(1, "La placa es requerida"),
    brand: z.string().optional(),
    model: z.string().optional(),
    color: z.string().optional(),
  }),
});

export type UpdateMandaderoInput = z.input<typeof updateMandaderoSchema>;
export type UpdateMandadero = z.output<typeof updateMandaderoSchema>;
