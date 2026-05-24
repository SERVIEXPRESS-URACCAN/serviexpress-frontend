import {
  BriefcaseBusiness,
  ChartBarStacked,
  ChartColumnStacked,
  LayoutDashboard,
  MapPinned,
  Motorbike,
  ReceiptText,
  UserRoundKey,
  UserRoundSearch
} from 'lucide-react'

export const ADMIN_SIDEBAR_SECTIONS = [
  {
    title: 'General',

    links: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        href: '/admin',
        icon: LayoutDashboard
      },

      {
        id: 'orders',
        title: 'Pedidos',
        href: '/admin/pedidos',
        icon: ReceiptText
      }
    ]
  },

  {
    title: 'Operaciones',

    links: [
      {
        id: 'businesses',
        title: 'Negocios',
        href: '/admin/business',
        icon: BriefcaseBusiness
      },

      {
        id: 'propietarios',
        title: 'Propietarios',
        href: '/admin/propietarios',
        icon: UserRoundKey
      },
      {
        id: 'delivery-drivers',
        title: 'Mandaderos',
        href: '/admin/mandaderos',
        icon: UserRoundSearch
      },

      {
        id: 'motorcycles',
        title: 'Motos',
        href: '/admin/motos',
        icon: Motorbike
      },
      {
        id: 'clientes',
        title: 'Clientes',
        href: '/admin/clientes',
        icon: UserRoundKey
      }



    ]
  },

  {
    title: 'Catálogos',

    links: [
      {
        id: 'business-categories',
        title: 'Categorías de negocios',
        href: '/admin/categories-business',
        icon: ChartBarStacked
      },

      {
        id: 'product-categories',
        title: 'Categorías de productos',
        href: '/admin/categories-products',
        icon: ChartColumnStacked
      },

      {
        id: 'cities',
        title: 'Ciudades',
        href: '/admin/cities',
        icon: MapPinned
      }
    ]
  }
]
