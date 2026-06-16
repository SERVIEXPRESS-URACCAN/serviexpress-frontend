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

import { useAuth } from '@/hooks/useAuth'

import { CreateOwner } from '@/schemas/owner.schema'

import { User } from '@/types/user.type'

import { useCreateOwner } from '@/hooks/owner/useCreateOwner'
import { CreateOwnerForm } from './create-owner-form'

type Props = {
  users: User[]
  onCreatedAction: () => Promise<void>
}

export const CreateOwnerDialog = ({ users, onCreatedAction }: Props) => {
  const [open, setOpen] = useState(false)
  const [serverError, setServerError] = useState('')

  const { session } = useAuth()

  const { execute, isLoading } = useCreateOwner()

  const handleCreate = async (data: CreateOwner) => {
    if (!session?.accessToken) return

    try {
      setServerError('')
      await execute(data, session.accessToken)

      setOpen(false)

      await onCreatedAction()
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message)
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Crear propietario</Button>
      </DialogTrigger>

      <DialogContent
        className='max-h-[90vh] overflow-y-auto sm:max-w-md'
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Crear propietario</DialogTitle>
        </DialogHeader>

        <CreateOwnerForm
          users={users}
          onSubmitAction={handleCreate}
          isLoading={isLoading}
          serverError={serverError}
        />
      </DialogContent>
    </Dialog>
  )
}
