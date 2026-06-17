'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { MoreVertical } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Order } from '@/types/order.type'

type Props = {
  order: Order
}

export const OrderOwnerActions = ({ order }: Props) => {
  const router = useRouter()

  return (
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
        <DropdownMenuItem
          onClick={() => router.push(`/owner/pedidos/${order.id}`)}
        >
          Ver detalles
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
