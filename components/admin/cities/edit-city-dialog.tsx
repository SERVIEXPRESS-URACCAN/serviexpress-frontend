'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

import { City, UpdateCityDto } from '@/types/city.types'

import { updateCity } from '@/services/city.service'

import { CityForm } from './city-form'

type Props = {
  city: City
  open: boolean
  onOpenChangeAction: (open: boolean) => void
}

export const EditCityDialog = ({ city, open, onOpenChangeAction }: Props) => {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const handleUpdate = async (data: UpdateCityDto) => {
    try {
      setIsLoading(true)

      await updateCity(city.id, data)

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
          <DialogTitle>Editar ciudad</DialogTitle>
        </DialogHeader>

        <CityForm
          defaultValues={{
            name: city.name
          }}
          onSubmitAction={handleUpdate}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  )
}
