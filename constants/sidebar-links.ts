import { LayoutDashboard, Settings, Users } from 'lucide-react'

export const ADMIN_SIDEBAR_LINKS = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard
  },
  {
    title: 'Usuarios',
    href: '/admin/users',
    icon: Users
  },
  {
    title: 'Configuración',
    href: '/admin/settings',
    icon: Settings
  }
]
