'use client'

import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

import { useAuth } from '@/hooks/useAuth'
import { UpdateOwner } from '@/schemas/owner.schema'
import { updateOwner } from '@/services/owner.service'
import { Owner } from '@/types/owner.types'
import { OwnerForm } from './owner-form'

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

  const [isLoading, setIsLoading] = useState(false)

  const handleUpdate = async (data: UpdateOwner) => {
    try {
      setIsLoading(true)

      if (!session?.accessToken) return

      await updateOwner(owner.id, data, session.accessToken)

      onOpenChangeAction(false)

      await onUpdated()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChangeAction}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar owner</DialogTitle>
        </DialogHeader>

        <OwnerForm
          defaultValues={{
            razonSocial: owner.razonSocial,
            profile: {
              name: owner.user?.profile?.name ?? '',
              lastName: owner.user?.profile?.lastName ?? '',
              cellphone: owner.user?.profile?.cellphone ?? '',
              genderId: owner.user?.profile?.gender?.id ?? 0
            }
          }}
          onSubmitAction={handleUpdate}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  )
}
