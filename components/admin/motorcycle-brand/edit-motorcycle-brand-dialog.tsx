'use client'

import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import {
  MotorcycleBrand,
  UpdateMotorcycleBrandDto,
} from '@/types/motorcycle.types'

import { updateMotorcycleBrand } from '@/services/motorcycle-brand.service'
import { MotorcycleBrandForm } from './motorcycle-brand'
type Props = {
  brand: MotorcycleBrand
  open: boolean
  onOpenChangeAction: (open: boolean) => void
  refreshAction: () => Promise<void>
}

export const EditMotorcycleBrandDialog = ({
  brand,
  open,
  onOpenChangeAction,
  refreshAction,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdate = async (data: UpdateMotorcycleBrandDto) => {
    try {
      setIsLoading(true)
      await updateMotorcycleBrand(brand.id, data)
      onOpenChangeAction(false)
      await refreshAction()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChangeAction}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar marca de motocicleta</DialogTitle>
        </DialogHeader>

        <MotorcycleBrandForm
          defaultValues={{
            name: brand.name,
          }}
          onSubmitAction={handleUpdate}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  )
}
