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
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { toggleProductStatus, updateProduct } from '@/services/products.service'
import Swal from 'sweetalert2'
type Props = {
  product: Product
  categories: CategoryProduct[]
}

export const ProductActions = ({ product, categories }: Props) => {
  const [openEdit, setOpenEdit] = useState(false)
  const router = useRouter()
  const { session } = useAuth()

  const handleToggleStatus = async () => {
    if (!session) return
    try {
      await toggleProductStatus(
        session.accessToken,
        product.id,
        !product.status,
      )
      router.refresh()
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
            {product.status ? 'Desactivar' : 'Activar'}
          </DropdownMenuItem>
          <DeleteProductDialog product={product} />
        </DropdownMenuContent>
      </DropdownMenu>

      <EditProductAdminDialog
        product={product}
        categories={categories}
        open={openEdit}
        onOpenChangeAction={setOpenEdit}
      />
    </>
  )
}
