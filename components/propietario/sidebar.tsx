'use client'

import Link from 'next/link'

import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

import { Separator } from '@/components/ui/separator'

import { OWNER_SIDEBAR_SECTIONS } from '@/constants/owner-sidebar-links'
import Logo from '../shared/logo'
import ThemeToggle from '../shared/theme-toggle'
import OwnerUserMenu from './owner-user-menu'

export default function OwnerSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex w-72 flex-col border-r bg-white dark:bg-zinc-950">
      <div className="flex h-24 items-center justify-center border-b px-6">
        {' '}
        <Logo />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-8">
          {OWNER_SIDEBAR_SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {section.title}
              </h2>

              <nav className="space-y-1">
                {section.links.map((link) => {
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
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 border-t p-4">
        <ThemeToggle />

        <Separator />

        <OwnerUserMenu />
      </div>
    </aside>
  )
}
