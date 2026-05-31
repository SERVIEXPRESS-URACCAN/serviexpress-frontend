import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { FormError } from './form-error'

type Props = {
  onChangeAction: (file: File) => void
  error?: string
}

export const ImageUploadField = ({ onChangeAction, error }: Props) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="image">Imagen de identificación</Label>

      <Input
        id="image"
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0]

          if (file) {
            onChangeAction(file)
          }
        }}
      />

      <FormError message={error} />
    </div>
  )
}
