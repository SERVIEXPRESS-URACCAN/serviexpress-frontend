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

import Swal from 'sweetalert2'
import { toggleProductStatusAdmin } from '@/services/products.service'

type Props = {
  product: Product
  businessId: number
  categories: CategoryProduct[]
  refreshAction?: () => Promise<void>
}

export const ProductActions = ({
  product,
  businessId,
  categories,
  refreshAction,
}: Props) => {
  const [openEdit, setOpenEdit] = useState(false)

  const handleToggleStatus = async () => {
    try {
      await toggleProductStatusAdmin(product.id, !product.status)
      await refreshAction?.()
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text:
          error instanceof Error ? error.message : 'Error al actualizar estado',
      })
    }
  }
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
          <DropdownMenuItem onClick={handleToggleStatus}>
            <span>{product.status ? 'Deshabilitar' : 'Activar'}</span>
          </DropdownMenuItem>

          <DeleteProductDialog
            product={product}
            refreshAction={refreshAction}
          />
        </DropdownMenuContent>
      </DropdownMenu>

      <EditProductAdminDialog
        product={product}
        categories={categories}
        businessId={businessId}
        open={openEdit}
        onOpenChangeAction={setOpenEdit}
        refreshAction={refreshAction}
      />
    </>
  )
}
