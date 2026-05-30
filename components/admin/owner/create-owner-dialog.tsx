'use client'

import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'

import { useAuth } from '@/hooks/useAuth'

import { CreateOwner } from '@/schemas/owner.schema'

import { createOwner } from '@/services/owner.service'

import { User } from '@/types/user.type'
import { CreateOwnerForm } from './create-owner-form'

type Props = {
  users: User[]
  onCreated: () => Promise<void>
}

export const CreateOwnerDialog = ({ users, onCreated }: Props) => {
  const [open, setOpen] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const { session } = useAuth()

  const token = session?.accessToken ?? ''

  const handleCreate = async (data: CreateOwner) => {
    try {
      setIsLoading(true)

      await createOwner(data, token)

      setOpen(false)

      await onCreated()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Crear propietario</Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Crear propietario</DialogTitle>
        </DialogHeader>

        <CreateOwnerForm
          users={users}
          onSubmitAction={handleCreate}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  )
}
