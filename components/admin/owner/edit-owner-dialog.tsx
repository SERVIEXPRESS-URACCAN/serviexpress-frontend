'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

import { useAuth } from '@/hooks/useAuth'
import { updateOwner } from '@/services/owner.service'
import { Owner, UpdateOwner } from '@/types/owner.types'
import { OwnerForm } from './owner-form'

type Props = {
  owner: Owner
  open: boolean
  onOpenChangeAction: (open: boolean) => void
}

export const EditOwnerDialog = ({ owner, open, onOpenChangeAction }: Props) => {
  const { session } = useAuth()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const handleUpdate = async (data: UpdateOwner) => {
    try {
      setIsLoading(true)

      if (!session?.accessToken) return
      await updateOwner(owner.id, data, session.accessToken)

      onOpenChangeAction(false)
      router.refresh()
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
            razonSocial: owner.razonSocial
            // gmail: owner.user?.email ?? ''
          }}
          onSubmitAction={handleUpdate}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  )
}
