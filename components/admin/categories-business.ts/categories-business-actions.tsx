'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CategoryBusiness } from '@/types/categories-business'
import { MoreVertical } from 'lucide-react'
import { useState } from 'react'
import { EditCategorBusinessDialog } from './edit-catergories-business-dialog'
import { DeleteCategoryBusinessDialog } from './delete-categories-business'

type Props = {
  categoryBusiness: CategoryBusiness
  refreshAction?: () => Promise<void>
}

export const CategoryBusinessActions = ({
  categoryBusiness,
  refreshAction,
}: Props & { refreshAction?: () => Promise<void> }) => {
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

          <DeleteCategoryBusinessDialog
            CategoryBusiness={categoryBusiness}
            refreshAction={refreshAction}
          />
        </DropdownMenuContent>
      </DropdownMenu>

      <EditCategorBusinessDialog
        CategoryBusiness={categoryBusiness}
        open={editOpen}
        onOpenChangeAction={setEditOpen}
        refreshAction={refreshAction}
      />
    </>
  )
}
