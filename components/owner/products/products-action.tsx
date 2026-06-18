'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { toggleProductStatus } from '@/services/owner/product-owner.service'
import { CategoryProduct } from '@/types/categories-products'
import { Product } from '@/types/products.type'
import { MoreVertical } from 'lucide-react'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { DeleteProductOwnerDialog } from './delete-product'
import { EditProductOwnerDialog } from './edit-product-owner-dialog'

type Props = {
  product: Product
  categories: CategoryProduct[]
  onSuccessAction?: () => Promise<void>
}

export const ProductOwnerActions = ({
  product,
  categories = [],
  onSuccessAction
}: Props) => {
  const [openEdit, setOpenEdit] = useState(false)

  const handleToggleStatus = async () => {
    try {
      await toggleProductStatus(product.id, !product.status)
      await onSuccessAction?.()
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text:
          error instanceof Error ? error.message : 'Error al actualizar estado'
      })
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setOpenEdit(true)}>
            Editar
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleToggleStatus}>
            <span>{product.status ? 'Desactivar' : 'Activar'}</span>
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
