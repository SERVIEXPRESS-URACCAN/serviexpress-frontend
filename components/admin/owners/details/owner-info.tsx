'use client'
import { InfoField } from '@/components/shared/Info-field'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { API_IMG_URL } from '@/config/config'
import { Owner } from '@/types/owner.types'

type Props = {
  owner: Owner
}

export const OwnerInfo = ({ owner }: Props) => {
  return (
    <Card className='w-ful'>
      {' '}
      <CardHeader>
        <CardTitle className='text-lg font-bold uppercase tracking-wide text-center'>
          Información Personal
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='flex justify-center  object-cover'>
          <Avatar className='h-32 w-32'>
            <AvatarImage
              src={
                owner.user?.profile?.profileImage
                  ? `${API_IMG_URL}/uploads/profile/${owner.user.profile.profileImage}`
                  : undefined
              }
              alt={`${owner.user?.profile?.name} ${owner.user?.profile?.lastName}`}
            />
            <AvatarFallback className='text-4xl font-bold'>
              {owner.user?.profile?.name?.charAt(0).toUpperCase() ?? '?'}
              {owner.user?.profile?.lastName?.charAt(0).toUpperCase() ?? '?'}
            </AvatarFallback>
          </Avatar>
        </div>
        <InfoField label='Nombre' value={owner.user?.profile?.name} />

        <InfoField label='Apellido' value={owner.user?.profile?.lastName} />

        <InfoField label='Teléfono' value={owner.user?.profile?.cellphone} />

        <InfoField label='Email' value={owner.user?.email} />

        <InfoField label='Género' value={owner.user?.profile?.gender?.name} />
      </CardContent>
    </Card>
  )
}
