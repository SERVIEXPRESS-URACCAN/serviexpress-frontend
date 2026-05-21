"use client";

import {
  useActionState,
  useEffect,
} from "react";

import { useRouter }
from "next/navigation";

import { useSession }
from "next-auth/react";

import { loginAction }
from "@/app/(auth)/login/actions";

import { getRedirectByRole }
from "@/lib/redirect-by-role";

const initialState = {
  error: "",
};

export function SignInForm() {
  const router = useRouter();

  const { data: session } =
    useSession();

  const [state, formAction] =
    useActionState(
      loginAction,
      initialState
    );

  useEffect(() => {
    if (!state.success) return;

    if (!session) return;

    router.replace(
      getRedirectByRole(
        session.user.roles
      )
    );
  }, [state.success, session, router]);

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