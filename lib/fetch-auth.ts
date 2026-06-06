import { signOut } from "next-auth/react";
import { handleSessionExpired } from "./session-expired";

export async function fetchAuth(
  input: RequestInfo | URL,
  init?: RequestInit
) {
  const response = await fetch(input, init);

  if (response.status === 401) {
    await handleSessionExpired();
    await signOut({ redirect: false }); 
    return response; 
  }

  return response;
}