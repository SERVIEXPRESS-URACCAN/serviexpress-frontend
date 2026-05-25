"use client";
import { logoutAction } from "@/app/(auth)/logout/actions";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button type="submit">
        Cerrar sesión
      </button>
    </form>
  );
}