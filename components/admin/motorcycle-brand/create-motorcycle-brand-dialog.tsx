'use client'

import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'

import { createMotorcycleBrand } from '@/services/motorcycle-brand.service'
import { MotorcycleBrandForm } from './motorcycle-brand'

type Props = {
  refreshAction: () => Promise<void>
}

export const CreateMotorcycleBrandDialog = ({ refreshAction }: Props) => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleCreate = async (data: { name: string }) => {
    try {
      setIsLoading(true)
      await createMotorcycleBrand(data)
      setOpen(false)
      await refreshAction()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Nueva marca</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear marca de motocicleta</DialogTitle>
        </DialogHeader>

        <MotorcycleBrandForm
          onSubmitAction={handleCreate}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  )
}
