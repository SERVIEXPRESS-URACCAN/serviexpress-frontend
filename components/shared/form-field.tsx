import { Label } from '@/components/ui/label'
import { FormError } from './form-error'

type Props = {
  label: string
  htmlFor?: string
  error?: string
  children: React.ReactNode
}

export const FormField = ({ label, htmlFor, error, children }: Props) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>{label}</Label>

      {children}

      <FormError message={error} />
    </div>
  )
}
