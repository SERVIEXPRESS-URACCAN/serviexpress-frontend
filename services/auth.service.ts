import type { LoginResponse } from '@/types/auth.types'

import { API_URL } from '@/config/config'
import type { LoginType } from '@/schemas/login.schema'

export async function loginService(data: LoginType): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify(data)
  })

  if (!response.ok) {
    throw new Error('Credenciales inválidas')
  }

  return response.json()
}

export async function refreshTokenService(refreshToken: string) {
  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    throw new Error("Refresh token failed");
  }

  return response.json() as Promise<{
    access_token: string;
    refresh_token: string;
    expires_at: number;
  }>;
}