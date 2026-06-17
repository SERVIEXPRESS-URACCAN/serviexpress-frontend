'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Product } from '@/types/products.type'
import { MoreVertical } from 'lucide-react'
import { useState } from 'react'
import { CategoryProduct } from '@/types/categories-products'
import { EditProductOwnerDialog } from './edit-product-owner-dialog'
import { DeleteProductOwnerDialog } from './delete-product'

type Props = {
  product: Product
  categories: CategoryProduct[]
  onSuccessAction?: () => Promise<void>
}

export const ProductOwnerActions = ({
  product,
  categories = [],
  onSuccessAction,
}: Props) => {
  const [openEdit, setOpenEdit] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='icon'>
            <MoreVertical className='size-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem onClick={() => setOpenEdit(true)}>
            Editar
          </DropdownMenuItem>

          <DeleteProductOwnerDialog
            product={product}
            onSuccessAction={onSuccessAction}
          />
        </DropdownMenuContent>
      </DropdownMenu>

      <EditProductOwnerDialog
        product={product}
        categories={categories}
        open={openEdit}
        onOpenChangeAction={setOpenEdit}
        onSuccessAction={onSuccessAction}
      />
    </>
  )
}
