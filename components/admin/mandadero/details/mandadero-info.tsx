'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mandadero } from "@/types/mandadero.type";

type Props = {
  mandadero: Mandadero
}

export const MandaderoInfo = ({ mandadero }: Props) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold uppercase tracking-wide">
          Información Personal
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {[
          { label: 'Nombre', value: mandadero.user?.profile?.name },
          { label: 'Apellido', value: mandadero.user?.profile?.lastName },
          { label: 'Teléfono', value: mandadero.user?.profile?.cellphone },
          { label: 'Género', value: mandadero.user?.profile?.gender?.name }
        ].map(({ label, value }) => (
          <div key={label}>
            <p className="text-sm font-medium text-muted-foreground">{label}</p>

            <div className="mt-1 rounded-md border bg-muted/30 px-3 py-2">
              <span className="text-base font-medium">{value || '-'}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
