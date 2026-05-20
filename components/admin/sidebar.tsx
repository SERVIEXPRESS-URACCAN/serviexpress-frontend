'use client'

import Link from 'next/link'

import { usePathname } from 'next/navigation'

import { ADMIN_SIDEBAR_LINKS } from '@/constants/sidebar-links'

import { cn } from '@/lib/utils'

import { Separator } from '@/components/ui/separator'

import UserMenu from './user-menu'

import ThemeToggle from '../shared/theme-toggle'

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex w-64 flex-col border-r bg-white dark:bg-zinc-950">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-bold">ServiExpress</h1>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {ADMIN_SIDEBAR_LINKS.map((link) => {
          const Icon = link.icon

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900',
                pathname === link.href && 'bg-zinc-100 dark:bg-zinc-900'
              )}
            >
              <Icon className="h-4 w-4" />

              {link.title}
            </Link>
          )
        })}
      </nav>

      <div className="space-y-4 border-t p-4">
        <ThemeToggle />

        <Separator />

        <UserMenu />
      </div>
    </aside>
  )
}
