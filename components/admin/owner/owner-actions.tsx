import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Owner } from '@/types/owner.types'
import { MoreVertical } from 'lucide-react'
import { useState } from 'react'

type Props = {
  owner: Owner
}

export const OwnerActions = ({ owner }: Props) => {
  const [editOpen, setEditOpen] = useState(false)
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className=" hover:bg-muted focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
          >
            <MoreVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            Editar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* <EditCityDialog
        city={city}
        open={editOpen}
        onOpenChangeAction={setEditOpen}
      /> */}
    </>
  )
}
