'use client'

import { updateCategoryBusiness } from '@/services/categories-business.service'
import {
  CategoryBusiness,
  UpdateCategoryBusinessDto,
} from '@/types/categories-business'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useState } from 'react'
import { CategoryBusinessForm } from './categories-business-form'

type Props = {
  CategoryBusiness: CategoryBusiness
  open: boolean
  onOpenChangeAction: (open: boolean) => void
  refreshAction?: () => Promise<void>
}
export const EditCategorBusinessDialog = ({
  CategoryBusiness,
  open,
  onOpenChangeAction,
  refreshAction,
}: Props) => {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setError('')
    }

    onOpenChangeAction(open)
  }

  const handleUpdate = async (data: UpdateCategoryBusinessDto) => {
    try {
      setIsLoading(true)

      await updateCategoryBusiness(
        CategoryBusiness.id,
        data,
      )

      onOpenChangeAction(false)

      await refreshAction?.()
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('La categoría ya existe')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        aria-describedby={undefined}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Editar categoría de negocio</DialogTitle>
        </DialogHeader>

        <CategoryBusinessForm
          defaultValues={{
            name: CategoryBusiness.name,
          }}
          error={error}
          onSubmitAction={handleUpdate}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  )
}
