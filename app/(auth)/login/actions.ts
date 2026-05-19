"use server";

import { signIn }
from "@/auth";

import { AuthError }
from "next-auth";

export type LoginState = {
  error?: string;
};

export async function loginAction(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  try {
    await signIn("credentials", {
      email:
        formData.get("email"),

      password:
        formData.get("password"),

      redirectTo: "/",
    });

    return {};
  } catch (error) {
    if (
      error instanceof AuthError
    ) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error:
              "Credenciales inválidas",
          };

        default:
          return {
            error:
              "Algo salió mal",
          };
      }
    }

    return {
      error:
        "Algo salió mal",
    };
  }
}