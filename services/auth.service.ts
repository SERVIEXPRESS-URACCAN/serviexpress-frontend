import type { LoginResponse } from '@/types/auth.types'

import type { LoginType } from '@/schemas/login.schema'

export async function loginService(data: LoginType): Promise<LoginResponse> {
  const response = await fetch(`${process.env.API_URL}/auth/login`, {
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
