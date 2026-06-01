'use client'

import { useState } from 'react'

import { MoreVertical } from 'lucide-react'

import { Button } from '@/components/ui/button'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { Clients } from '@/types/clients'
import { Gender } from '@/types/gender.type'

import { EditClientDialog } from './edit-client-dialog'
import { DeleteClientDialog } from './delete-client-dialog'

type Props = {
  client: Clients
  genders: Gender[]
  onUpdatedAction: () => Promise<void>
}

export const ClientesActions = ({
  client,
  genders,
  onUpdatedAction
}: Props) => {
  const [editOpen, setEditOpen] =
    useState(false)

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
          <DropdownMenuItem
            onClick={() => setEditOpen(true)}
          >
            Editar
          </DropdownMenuItem>
          <DeleteClientDialog
            client={client}
            onUpdatedAction={onUpdatedAction}
          />
        </DropdownMenuContent>
      </DropdownMenu>

      <EditClientDialog
        client={client}
        genders={genders}
        open={editOpen}
        onOpenChangeAction={setEditOpen}
        onUpdated={onUpdatedAction}
      />
    </>
  )
}