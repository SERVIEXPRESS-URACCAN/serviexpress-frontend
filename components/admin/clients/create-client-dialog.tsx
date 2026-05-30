'use client'

import { useState } from 'react'
import Swal, { SweetAlertOptions } from 'sweetalert2'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { ClientForm } from './client-form'

import { createClient } from '@/services/clients.service'
import { Gender } from '@/types/gender.type'
import { CreateUserDto } from '@/schemas/client.schema'

const fireSwal = (options: SweetAlertOptions) =>
  new Promise<Awaited<ReturnType<typeof Swal.fire>>>((resolve) => {
    setTimeout(() => resolve(Swal.fire(options)), 300)
  })

type Props = {
  token: string
  genders: Gender[]
  onCreatedAction:() => void
}

export const CreateClientDialog = ({
  token,
  genders,
  onCreatedAction
}: Props) => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const handleOpenChange = (value: boolean) => {
    setOpen(value)

    if (!value) {
      setServerError(null)
    }
  }

  const handleCreate = async (data: CreateUserDto) => {
    try {
      setIsLoading(true)
      setServerError(null)

      await createClient(data, token)

      setOpen(false)
      onCreatedAction()

      await fireSwal({
        icon: 'success',
        title: 'Cliente creado',
        text: `El cliente "${data.profile.name}" fue creado exitosamente.`,
        theme: 'auto'
      })

    } catch (error) {
      let err: any = null

      if (error instanceof Error) {
        try {
          err = JSON.parse(error.message)
        } catch {
          err = null
        }
      }

      const message = err?.message || 'Error al crear cliente'

      setServerError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>Nuevo cliente</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear cliente</DialogTitle>
        </DialogHeader>

        <ClientForm
          genders={genders}
          onSubmitAction={handleCreate}
          isLoading={isLoading}
          serverError={serverError}
          onClearServerErrorAction={() => setServerError(null)}
        />
      </DialogContent>
    </Dialog>
  )
}