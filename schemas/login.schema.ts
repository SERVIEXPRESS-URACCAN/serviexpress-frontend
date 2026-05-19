import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .email("Correo inválido")
    .refine(
      (email) =>
        email.endsWith("@gmail.com"),
      {
        message:
          "Solo se permiten correos Gmail",
      }
    ),

  password: z
    .minLength(6, "Mínimo 6 caracteres"),
});

export type LoginType =
  z.infer<typeof LoginSchema>;