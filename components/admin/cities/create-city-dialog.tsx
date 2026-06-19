'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'

import { createCity } from '@/services/city.service'

import { CityForm } from './city-form'

type Props = {
  refreshAction?: () => Promise<void>
}

export const CreateCityDialog = ({ refreshAction }: Props) => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleCreate = async (data: { name: string }) => {
    try {
      setIsLoading(true)

      await createCity(data)

      setOpen(false)

      await refreshAction?.()
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Nueva ciudad</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear ciudad</DialogTitle>
        </DialogHeader>

        <CityForm onSubmitAction={handleCreate} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  )
}
