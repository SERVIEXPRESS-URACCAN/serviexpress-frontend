'use client'
import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { Clients } from '@/types/clients'
import { UpdateClientProfileDto } from '@/schemas/client.schema'
import { updateClientProfile } from '@/services/clients.service'
import { ClientEditForm } from './client-edit-form'
import { Gender } from '@/types/gender.type'
import { updateUserStatus } from '@/services/users.service'

type Props = {
  client: Clients | null
  genders: Gender[]
  open: boolean
  onOpenChangeAction: (open: boolean) => void
  onUpdatedAction: () => Promise<void>
}

export const EditClientDialog = ({
  client,
  genders,
  open,
  onOpenChangeAction,
  onUpdatedAction,
}: Props) => {

  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState<{
    field: 'cellphone'
    message: string
  } | null>(null)
  const handleUpdate = async (data: UpdateClientProfileDto) => {
    try {
      setIsLoading(true)
      setServerError(null)

      if (!client ) return

      if (!client.user?.id) {
        setServerError({
          field: 'cellphone',
          message: 'No se encontró el usuario asociado',
        })
        return
      }

      await Promise.all([
        updateClientProfile(client.id, data),
        updateUserStatus(client.user.id, data.status),
      ])
      onOpenChangeAction(false)

      await onUpdatedAction?.()
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error al actualizar'
      setServerError({ field: 'cellphone', message: message })
    } finally {
      setIsLoading(false)
    }
  }

  if (!client) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChangeAction}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Editar cliente</DialogTitle>
        </DialogHeader>

        <ClientEditForm
          genders={genders}
          defaultValues={{
            name: client.name,
            lastName: client.lastName,
            cellphone: client.cellphone,
            gender_id: client.gender?.id || 0,
            status: client.user?.status ?? true,
          }}
          onSubmitAction={handleUpdate}
          isLoading={isLoading}
          serverError={serverError}
          onClearServerErrorAction={() => setServerError(null)}
        />
      </DialogContent>
    </Dialog>
  )
}
