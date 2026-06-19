'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useAuth } from '@/hooks/useAuth'
import {
  createMandaderoAdmin,
  getMandaderos,
  getUsers,
} from '@/services/mandadero.service'
import { CreateMandaderoAdminDto } from '@/types/mandadero.type'
import { useEffect, useState } from 'react'
import { MandaderoForm } from './create-mandadero-form'
import Swal from 'sweetalert2'
import { UseFormSetError } from 'react-hook-form'
import { CreateMandaderoInput } from '@/schemas/mandaderos.schema'
import { User } from '@/types/user.type'
import { Button } from '@/components/ui/button'


type Props={
refreshAction?: ()=> Promise<void>
}
export const CreateMandaderoDialog = ({refreshAction}:Props) => {
  const { session } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [error, setError] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open && session) {
      Promise.all([
        getUsers(session.accessToken),
        getMandaderos(session.accessToken),
      ]).then(([usersResponse, mandaderosResponse]) => {
        const allUsers = (usersResponse as unknown as { data: User[] }).data

        const mandaderoUserIds = new Set(
          mandaderosResponse.data.map((mandadero) => mandadero.user.id),
        )
        const filteredUsers = allUsers.filter(
          (u) => !mandaderoUserIds.has(u.id),
        )
        setUsers(filteredUsers)
      })
    }
  }, [open, session])

  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => setError(null), 0)
      return () => clearTimeout(timer)
    }
  }, [open])
  const handleSubmit = async (
    data: CreateMandaderoAdminDto,
    setFieldError: UseFormSetError<CreateMandaderoInput>,
  ) => {
    if (!session) return
    setError(null)

    try {
      setIsLoading(true)
      await createMandaderoAdmin( data)
      
      await refreshAction?.()

      await Swal.fire({
        icon: 'success',
        title: 'Mandadero creado',
        text: `Mandadero creado exitosamente.`,
        timer: 2000,
        showConfirmButton: false,
      })
      setOpen(false)
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Error al crear el mandadero'
      if (message.toLowerCase().includes('placa')) {
        setFieldError('licensePlate', {
          message: 'Esta placa ya está registrada',
        })
      } else {
        setError(message)
      }
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Crear Mandadero</Button>
      </DialogTrigger>
      <DialogContent
        className='max-h-[90vh] overflow-y-auto'
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Crear Mandadero</DialogTitle>
        </DialogHeader>
        <MandaderoForm
          users={users}
          onSubmitAction={handleSubmit}
          isLoading={isLoading}
          error={error}
        />
      </DialogContent>
    </Dialog>
  )
}
