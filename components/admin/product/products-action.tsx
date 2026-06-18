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
import { EditProductAdminDialog } from './edit-product-admin-dialog'
import { CategoryProduct } from '@/types/categories-products'
import { DeleteProductDialog } from './delete-product'

type Props = {
  product: Product
  categories: CategoryProduct[]
  refreshAction?: ()=> Promise<void>
}

export const ProductActions = ({ product, categories, refreshAction }: Props) => {
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

          <DeleteProductDialog product={product} />
        </DropdownMenuContent>
      </DropdownMenu>

      <EditProductAdminDialog
        product={product}
        categories={categories}
        open={openEdit}
        onOpenChangeAction={setOpenEdit}
        refreshAction={refreshAction}
      />
    </>
  )
}
