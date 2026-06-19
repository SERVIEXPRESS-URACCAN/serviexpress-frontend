'use client'
import { logoutAction } from '@/app/(auth)/logout/actions'
import { clearAuthToken } from '@/lib/fetch-auth'
import { useRouter } from 'next/navigation'

export function LogoutButton() {
  const router = useRouter()
  const handleLogout = async () => {
    clearAuthToken()
    await logoutAction()

    router.replace('/login')
    router.refresh()
  }
  return (
    <button type="submit" onClick={handleLogout}>
      Cerrar sesión
    </button>
  )
}
