'use client'

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  Dialog,
  DialogDescription,
} from '@/components/ui/dialog'

import { useAuth } from '@/hooks/useAuth'
import { updateMandaderoProfile } from '@/services/mandadero-profile.service'
import {
  updateMandaderoActive,
  updateMandaderoAvailability,
  updateMotorcycle,
} from '@/services/mandadero.service'
import { Mandadero } from '@/types/mandadero.type'
import { UpdateMandaderoInput } from '@/schemas/mandaderos.schema'
import { useState } from 'react'
import { EditMandaderoForm } from './edit-mandadero-form'

type Props = {
  mandadero: Mandadero
  open: boolean
  onOpenChangeAction: (open: boolean) => void
  refreshAction?: () => Promise<void>
}

export const EditMandaderoDialog = ({
  mandadero,
  open,
  onOpenChangeAction,
  refreshAction,
}: Props) => {
  const { session } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (data: UpdateMandaderoInput) => {
    if (!session) return

    const profileId = mandadero.user?.profile?.id
    if (!profileId) return

    try {
      setIsSubmitting(true)
      await updateMotorcycle(
        mandadero.motorcycle.id,
        data.motorcycle,
      )

      await updateMandaderoProfile(
        profileId,
        data.profile,
      )

      await updateMandaderoActive(
        mandadero.id,
        data.isActive,
      )

      await updateMandaderoAvailability(
        mandadero.id,
        data.available,
      )

      onOpenChangeAction(false)
      await refreshAction?.()
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error al actualizar'

      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }
  const handleOpenChange = (value: boolean) => {
    if (!value) setError(null)
    onOpenChangeAction(value)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className='max-h-[90vh] overflow-y-auto '
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Editar Mandadero</DialogTitle>
          <DialogDescription>
            Edita la información del mandadero.
          </DialogDescription>
        </DialogHeader>
        <EditMandaderoForm
          mandadero={mandadero}
          onSubmitAction={onSubmit}
          isSubmitting={isSubmitting}
          error={error}
        />
      </DialogContent>
    </Dialog>
  )
}
