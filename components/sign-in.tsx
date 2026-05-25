"use client";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "@/app/(auth)/login/actions";
import { getRedirectByRole } from "@/lib/redirect-by-role";
import { useAuth } from "@/hooks/useAuth"; 

const initialState = { error: "" };

export function SignInForm() {
  const router = useRouter();
  const { update } = useAuth();
  const [state, formAction] = useActionState(loginAction, initialState);

  useEffect(() => {
    if (!state.success) return;

    update().then((updatedSession) => {
      if (!updatedSession) return;
      router.replace(getRedirectByRole(updatedSession.user.roles));
    });
  }, [state.success]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input name="email" type="email" placeholder="Correo" />
      <input name="password" type="password" placeholder="Contraseña" />
      {state.error && <p>{state.error}</p>}
      <button type="submit">Iniciar sesión</button>
    </form>
  );
}