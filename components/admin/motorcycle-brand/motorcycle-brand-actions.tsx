'use client'

import { useState } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Button } from '@/components/ui/button'
import { MoreVertical } from 'lucide-react'

import { MotorcycleBrand } from '@/types/motorcycle.types'
import { EditMotorcycleBrandDialog } from './edit-motorcycle-brand-dialog'

type Props = {
  brand: MotorcycleBrand
  refreshAction: () => Promise<void>
}

export const MotorcycleBrandActions = ({ brand, refreshAction }: Props) => {
  const [editOpen, setEditOpen] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='icon'
            className='hover:bg-muted focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none'
          >
            <MoreVertical className='size-4' />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end'>
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            Editar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditMotorcycleBrandDialog
        brand={brand}
        open={editOpen}
        onOpenChangeAction={setEditOpen}
        refreshAction={refreshAction}
      />
    </>
  )
}
