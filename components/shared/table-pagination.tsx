'use client'

import { usePathname, useSearchParams } from 'next/navigation'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'

type Props = Readonly<{
  currentPage: number
  totalPages: number
}>

export function TablePagination({
  currentPage,
  totalPages
}: Props) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createPageURL = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())

    params.set('page', page.toString())

    return `${pathname}?${params.toString()}`
  }

  const generatePages = () => {
    type PageItem =
      | { type: 'page'; value: number }
      | { type: 'ellipsis'; id: string }

    const pages: PageItem[] = []

    pages.push({ type: 'page', value: 1 })

    if (currentPage > 2) {
      pages.push({
        type: 'ellipsis',
        id: 'left-ellipsis'
      })
    }

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push({
        type: 'page',
        value: i
      })
    }

    if (currentPage < totalPages - 2) {
      pages.push({
        type: 'ellipsis',
        id: 'right-ellipsis'
      })
    }

    if (totalPages > 1) {
      pages.push({
        type: 'page',
        value: totalPages
      })
    }

    return pages
  }

  const pages = generatePages()

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={
              currentPage > 1
                ? createPageURL(currentPage - 1)
                : '#'
            }
            className={
              currentPage === 1
                ? 'pointer-events-none opacity-50'
                : ''
            }
          />
        </PaginationItem>

        {pages.map((page) => {
          if (page.type === 'ellipsis') {
            return (
              <PaginationItem key={page.id}>
                <PaginationEllipsis />
              </PaginationItem>
            )
          }

          return (
            <PaginationItem key={page.value}>
              <PaginationLink
                href={createPageURL(page.value)}
                isActive={currentPage === page.value}
              >
                {page.value}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        <PaginationItem>
          <PaginationNext
            href={
              currentPage < totalPages
                ? createPageURL(currentPage + 1)
                : '#'
            }
            className={
              currentPage === totalPages
                ? 'pointer-events-none opacity-50'
                : ''
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}