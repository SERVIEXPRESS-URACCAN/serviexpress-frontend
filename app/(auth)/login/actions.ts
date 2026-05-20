"use server";

import { signIn }
from "@/auth";

import { AuthError }
from "next-auth";

import { auth }
from "@/auth";

import { redirect }
from "next/navigation";

import {
  isAdmin,
  isOwner,
} from "@/lib/permissions";

export type LoginState = {
  error?: string;
};

export async function loginAction(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  try {
    await signIn(
      "credentials",
      {
        email:
          formData.get(
            "email"
          ),

        password:
          formData.get(
            "password"
          ),

        redirect: false,
      }
    );

    const session =
      await auth();

    const roles =
      session?.user.roles ?? [];

    if (isAdmin(roles)) {
      redirect("/admin");
    }

    if (isOwner(roles)) {
      redirect("/owner");
    }

    return {
      error:
        "No tienes permisos para acceder al dashboard",
    };
  } catch (error) {
    if (
      error instanceof AuthError
    ) {
      switch (
        error.type
      ) {
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

    throw error;
  }
}