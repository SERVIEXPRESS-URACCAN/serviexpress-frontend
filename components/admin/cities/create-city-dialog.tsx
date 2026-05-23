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

import { createCity } from '@/services/city.services'

import { CityForm } from './city-form'

export const CreateCityDialog = () => {
  const router = useRouter()

  const [open, setOpen] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const handleCreate = async (data: { name: string }) => {
    try {
      setIsLoading(true)

      await createCity(data)

      setOpen(false)

      router.refresh()
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
