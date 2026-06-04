import { LayoutDashboard, ReceiptText, SaladIcon } from 'lucide-react'

export const OWNER_SIDEBAR_SECTIONS = [
  {
    title: 'General',

    links: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        href: '/owner',
        icon: LayoutDashboard
      },
      {
        id: 'products',
        title: 'Productos',
        href: '/owner/products',
        icon: SaladIcon
      },
      {
        id: 'orders',
        title: 'Pedidos',
        href: '/owner/pedidos',
        icon: ReceiptText
      }
    ]
  }
]
