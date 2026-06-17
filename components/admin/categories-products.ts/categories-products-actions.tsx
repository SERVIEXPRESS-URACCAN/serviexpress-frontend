'use client'

import { useState } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { Button } from '@/components/ui/button'

import { MoreVertical } from 'lucide-react'
import { CategoryProduct } from '@/types/categories-products'
import { EditCategoryProductDialog } from './edit-categories-products-dialog'
import { DeleteCategoryProductDialog } from './delete-categories-products'



type Props = {
  categoryProduct: CategoryProduct,
  refreshAction?: () => Promise<void>
}

export const CategoryProductActions = ({ categoryProduct,refreshAction }: Props) => {
  const [editOpen, setEditOpen] = useState(false)

 return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-muted focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
          >
            <MoreVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            Editar
          </DropdownMenuItem>

          <DeleteCategoryProductDialog
           categoryProduct={categoryProduct}
           refreshAction={refreshAction}

          />
        </DropdownMenuContent>
      </DropdownMenu>

      <EditCategoryProductDialog
        categoryProduct={categoryProduct}
        open={editOpen}
        onOpenChangeAction={setEditOpen}
        refreshAction={refreshAction}

      />

    </>
  )

}
