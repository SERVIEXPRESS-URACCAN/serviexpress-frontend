import { z } from "zod";

export const LoginSchema =
  z.object({
    email: z
      .string()
      .email(
        "Correo inválido"
      )
      .refine(
        (email) =>
          email.endsWith(
            "@gmail.com"
          ),
        {
          message:
            "Solo se permiten correos Gmail",
        }
      ),

    password: z
      .string()
      .min(
        6,
        "Mínimo 6 caracteres"
      ),
  });

export type LoginType =
  z.infer<typeof LoginSchema>;