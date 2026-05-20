"use client";

import { useActionState }
from "react";

import { loginAction }
from "@/app/(auth)/login/actions";

const initialState = {
  error: "",
};

export function SignInForm() {
  const [state, formAction] =
    useActionState(
      loginAction,
      initialState
    );

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4"
    >
      <input
        name="email"
        type="email"
        placeholder="Correo"
      />

      <input
        name="password"
        type="password"
        placeholder="Contraseña"
      />

      {state.error && (
        <p>{state.error}</p>
      )}

      <button type="submit">
        Iniciar sesión
      </button>
    </form>
  );
}