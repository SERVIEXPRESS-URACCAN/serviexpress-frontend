'use client'

import Link from 'next/link'

import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

import { Separator } from '@/components/ui/separator'

import { ADMIN_SIDEBAR_SECTIONS } from '@/constants/sidebar-links'

import UserMenu from './user-menu'

import Logo from '../shared/logo'
import ThemeToggle from '../shared/theme-toggle'
import { useEffect, useState } from 'react'
import { getOwnerApplications } from '@/services/owner.service'
import { getSolicitudMandadero } from '@/services/mandadero.service'

export default function Sidebar() {
  const pathname = usePathname()

  const [ownerCount, setOwnerCount] = useState(0)
  const [mandaderoCount, setMandaderoCount] = useState(0)

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const [owners, mandaderos] = await Promise.all([
          getOwnerApplications(1, 'PENDING'),
          getSolicitudMandadero(1),
        ])

        setOwnerCount(owners.pagination.total)
        setMandaderoCount(mandaderos.pagination.total)
      } catch (error) {
        console.error('Error obteniendo solicitudes pendientes:', error)
      }
    }

    fetchSolicitudes()

    window.addEventListener('focus', fetchSolicitudes)

    return () => {
      window.removeEventListener('focus', fetchSolicitudes)
    }
  }, [pathname])

  return (
    <aside className='flex w-72 flex-col border-r bg-white dark:bg-zinc-950'>
      <div className='flex h-24 items-center justify-center border-b px-6'>
        {' '}
        <Logo />
      </div>

      <div className='flex-1 overflow-y-auto px-4 py-6'>
        <div className='space-y-8'>
          {ADMIN_SIDEBAR_SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 className='mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                {section.title}
              </h2>

              <nav className='space-y-1'>
                {section.links.map((link) => {
                  const Icon = link.icon

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900',
                        pathname === link.href &&
                          'bg-zinc-100 dark:bg-zinc-900',
                      )}
                    >
                      <Icon className='h-4 w-4' />

                      <span className='flex-1'>{link.title}</span>

                      {link.id === 'solicitudes' &&
                        ownerCount + mandaderoCount > 0 && (
                          <span className='flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-600 px-1.5 text-xs font-semibold text-white'>
                            {ownerCount + mandaderoCount > 99
                              ? '99+'
                              : ownerCount + mandaderoCount}
                          </span>
                        )}
                    </Link>
                  )
                })}
              </nav>
            </div>
          ))}
        </div>
      </div>

      <div className='space-y-4 border-t p-4'>
        <ThemeToggle />

        <Separator />

        <UserMenu />
      </div>
    </aside>
  )
}
