'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mandadero } from "@/types/mandadero.type";

type Props = {
  mandadero: Mandadero
}

export const MandaderoMotorcycle = ({ mandadero }: Props) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-bold uppercase tracking-wide">
          Motocicleta
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-2 text-3xl gap-4">
        {[
          { label: 'Marca', value: mandadero.motorcycle?.brand },
          { label: 'Modelo', value: mandadero.motorcycle?.model },
          { label: 'Placa', value: mandadero.motorcycle?.licensePlate },
          { label: 'Color', value: mandadero.motorcycle?.color }
        ].map(({ label, value }) => (
          <div key={label} className="rounded-lg border bg-muted/20 p-4">
            <p className="text-sm text-muted-foreground">{label}</p>

            <p className="mt-1 font-semibold">{value || '-'}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
