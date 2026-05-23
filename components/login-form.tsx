'use client'

import { useRouter } from 'next/navigation'
import { useActionState, useEffect, useState } from 'react'

import Image from 'next/image'

import { loginAction } from '@/app/(auth)/login/actions'
import { useAuth } from '@/hooks/useAuth'
import { getRedirectByRole } from '@/lib/redirect-by-role'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'

import { Input } from '@/components/ui/input'
import { Eye, EyeOff } from 'lucide-react'

const initialState = {
  error: '',
  success: false
}

type Props = React.ComponentProps<'div'>

export function LoginForm({ className, ...props }: Props) {
  const router = useRouter()
  const { update } = useAuth()

  const [state, formAction] = useActionState(loginAction, initialState)

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  })

  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (!state.success) return

    update().then((updatedSession) => {
      if (!updatedSession) return

      router.replace(getRedirectByRole(updatedSession.user.roles))
    })
  }, [state.success, update, router])

  const handleSubmit = async (formData: FormData) => {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const newErrors = {
      email: '',
      password: ''
    }

    if (!email) {
      newErrors.email = 'El correo es requerido'
    }

    if (!password) {
      newErrors.password = 'La contraseña es requerida'
    }

    setErrors(newErrors)

    if (newErrors.email || newErrors.password) {
      return
    }

    return formAction(formData)
  }

  return (
    <div className={cn('flex flex-col gap-3', className)} {...props}>
      <Card>
        <CardHeader className="flex flex-col items-center justify-center gap-2">
          <Image
            src="/logos/logo-light.png"
            alt="ServiExpress"
            width={180}
            height={60}
            priority
            className="block h-36 w-auto object-contain dark:hidden"
          />

          <Image
            src="/logos/logo.png"
            alt="ServiExpress"
            width={180}
            height={60}
            priority
            className="hidden h-36 w-auto object-contain dark:block"
          />
        </CardHeader>

        <CardContent>
          <form action={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Correo</FieldLabel>

                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Ingresa tu correo"
                />

                {errors.email && (
                  <p className="text-sm text-red-400">{errors.email}</p>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Contraseña</FieldLabel>

                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                  />

                  <button
                    type="button"
                    className="absolute right-2 top-2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-sm text-red-400">{errors.password}</p>
                )}
              </Field>

              {/* ERROR BACKEND */}
              {state.error && (
                <p className="text-sm text-red-400 font-medium">
                  {state.error}
                </p>
              )}

              <Field>
                <Button type="submit" className="w-full">
                  Iniciar sesión
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
