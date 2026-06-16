import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useAuth } from '@/hooks/useAuth'
import { UpdateBusinessInput } from '@/schemas/business.schema'
import { updateBusiness } from '@/services/business.service'
import { getCategoryBusiness } from '@/services/categories-business.service'
import { getCities } from '@/services/city.service'
import { Business } from '@/types/business.type'
import { CategoryBusiness } from '@/types/categories-business'
import { City } from '@/types/city.types'
import { useEffect, useState } from 'react'
import { EditBusinessForm } from './edit-business-form'

type Props = {
  business: Business
  open: boolean
  onOpenChangeAction: (open: boolean) => void
  refreshAction: () => Promise<void>
}

export const EditBusinessDialog = ({
  business,
  open,
  onOpenChangeAction,
  refreshAction,
}: Props) => {
  const { session } = useAuth()

  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [cities, setCities] = useState<City[]>([])
  const [categories, setCategories] = useState<CategoryBusiness[]>([])

  useEffect(() => {
    if (open && session) {
      getCities().then(setCities)
      getCategoryBusiness().then((res) => setCategories(res.data))
    }
  }, [open, session])

  const handleOpenChange = (value: boolean) => {
    if (!value) setError(null)
    onOpenChangeAction(value)
  }

  const onSubmit = async (data: UpdateBusinessInput) => {
    if (!session) return

    try {
      setIsSubmitting(true)
      setError(null)

      const formData = new FormData()

      formData.append('name', data.name ?? '')
      if (data.description) formData.append('description', data.description)
      if (data.address) formData.append('address', data.address)
      if (data.phone) formData.append('phone', data.phone)
      formData.append('city', String(data.city))

      data.businessCategories?.forEach((catId) =>
        formData.append('businessCategories', String(catId)),
      )
      if (data.logoImage) formData.append('logoImage', data.logoImage)
      if (data.bannerImage) formData.append('bannerImage', data.bannerImage)

      await updateBusiness( business.id, formData)

      await refreshAction?.()
      onOpenChangeAction(false)
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error updating business'
      console.log('error message:', message)
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className='sm:max-w-lg'
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle> Editar Negocio</DialogTitle>
        </DialogHeader>
        <EditBusinessForm
          key={open ? 'open' : 'closed'}
          business={business}
          cities={cities}
          categories={categories}
          onSubmitAction={onSubmit}
          isSubmitting={isSubmitting}
          error={error}
        />
      </DialogContent>
    </Dialog>
  )
}
