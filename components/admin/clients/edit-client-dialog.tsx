
import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { useAuth } from '@/hooks/useAuth'
import { Clients } from '@/types/clients'
import { UpdateClientProfileDto } from '@/schemas/client.schema'
import { updateClientProfile } from '@/services/clients.service'
import { ClientEditForm } from './client-edit-form'
import { Gender } from '@/types/gender.type'

type Props = {
  client: Clients | null
  genders: Gender[]
  open: boolean
  onOpenChangeAction: (open: boolean) => void
  onUpdated: () => Promise<void>

}

export const EditClientDialog = ({
  client,
  genders,
  open,
  onOpenChangeAction,
  onUpdated

}: Props) => {
  const { session } = useAuth()

  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const handleUpdate = async (data: UpdateClientProfileDto) => {
  try {
    setIsLoading(true)
    setServerError(null)

    if (!client || !session?.accessToken) return

    await updateClientProfile(client.id, data, session.accessToken)

    onOpenChangeAction(false)

    await onUpdated?.()
  } catch (error) {
    setServerError(
      error instanceof Error ? error.message : 'Error al actualizar'
    )
  } finally {
    setIsLoading(false)
  }
}

  if (!client) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChangeAction}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar cliente</DialogTitle>
        </DialogHeader>

        <ClientEditForm
          genders={genders}
          defaultValues={{
            name: client.name,
            lastName: client.lastName,
            cellphone: client.cellphone,
            gender_id: client.gender?.id || 0
          }}
          onSubmitAction={handleUpdate}
          isLoading={isLoading}
          serverError={serverError}
        />
      </DialogContent>
    </Dialog>
  )
}