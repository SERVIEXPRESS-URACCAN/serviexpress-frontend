import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Owner } from '@/types/owner.types'
import { MoreVertical } from 'lucide-react'
import { useState } from 'react'
import { EditOwnerDialog } from './edit-owner-dialog'
import { useRouter } from 'next/navigation'

type Props = {
  owner: Owner
  onUpdated: () => Promise<void>
}

export const OwnerActions = ({ owner, onUpdated }: Props) => {
  const router = useRouter()
  const [editOpen, setEditOpen] = useState(false)
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='icon'
            className=' hover:bg-muted focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none'
          >
            <MoreVertical className='size-4' />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end'>
          <DropdownMenuItem
            onClick={() => router.push(`/admin/propietarios/${owner.id}`)}
          >
            Ver
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            Editar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditOwnerDialog
        owner={owner}
        open={editOpen}
        onOpenChangeAction={setEditOpen}
        onUpdated={onUpdated}
      />
    </>
  )
}
