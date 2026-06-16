'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Business } from '@/types/business.type'
import { MoreVertical } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { EditBusinessDialog } from './edit-business-dialog'

type Props = {
  business: Business
  refreshAction: () => Promise<void>
}

export const BusinessActions = ({ business, refreshAction }: Props) => {
  const router = useRouter()
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
          <DropdownMenuItem
            onClick={() => router.push(`/admin/business/${business.id}`)}
          >
            Ver
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenEdit(true)}>
            Editar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditBusinessDialog
        business={business}
        open={openEdit}
        onOpenChangeAction={setOpenEdit}
        refreshAction={refreshAction}
      />
    </>
  )
}
