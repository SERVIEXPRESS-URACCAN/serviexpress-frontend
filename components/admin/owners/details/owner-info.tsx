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
        <CardTitle className='text-lg font-bold uppercase tracking-wide'>
          Información Personal
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='flex justify-center'>
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
        {[
          { label: 'Nombre', value: owner.user?.profile?.name },
          { label: 'Apellido', value: owner.user?.profile?.lastName },
          { label: 'Teléfono', value: owner.user?.profile?.cellphone },
          { label: 'Email', value: owner.user?.email },
          { label: 'Género', value: owner.user?.profile?.gender?.name },
        ].map(({ label, value }) => (
          <div key={label} className='space-y-1'>
            <label className='text-lg font-bold block'>{label}</label>
            <input
              value={value ?? '-'}
              disabled
              className='w-full rounded-md border px-4 py-2 text-base bg-muted'
            />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
