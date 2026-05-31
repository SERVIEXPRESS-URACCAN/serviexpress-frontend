'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

import { useAuth } from '@/hooks/useAuth'

import { UpdateOwner } from '@/schemas/owner.schema'

import { Owner } from '@/types/owner.types'

import { useUpdateOwner } from '@/hooks/owner/useUpdateOwner'
import { UpdateOwnerForm } from './update-owner-form'

type Props = {
  owner: Owner
  open: boolean
  onOpenChangeAction: (open: boolean) => void
  onUpdated: () => Promise<void>
}

export const EditOwnerDialog = ({
  owner,
  open,
  onOpenChangeAction,
  onUpdated
}: Props) => {
  const { session } = useAuth()
  const { execute, isLoading } = useUpdateOwner()

  const handleUpdate = async (data: UpdateOwner) => {
    if (!session?.accessToken) return

    try {
      await execute(owner.id, data, session.accessToken)

      onOpenChangeAction(false)

      await onUpdated()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChangeAction}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar propietario</DialogTitle>
        </DialogHeader>

        <UpdateOwnerForm
          defaultValues={{
            razonSocial: owner.razonSocial ?? '',
            profile: {
              name: owner.user?.profile?.name ?? '',
              lastName: owner.user?.profile?.lastName ?? '',
              cellphone: owner.user?.profile?.cellphone ?? '',
              genderId: owner.user?.profile?.gender?.id ?? 0
            },
            identificationCardImage: undefined
          }}
          onSubmitAction={handleUpdate}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  )
}
