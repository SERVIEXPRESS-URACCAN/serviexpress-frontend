'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mandadero } from "@/types/mandadero.type";

type Props = {
  mandadero: Mandadero;
};

export const MandaderoMotorcycle = ({ mandadero }: Props) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold uppercase tracking-wide">
          Motocicleta
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col justify-between h-full gap-4 py-4">
        {[
          { label: "Marca", value: mandadero.motorcycle?.brand },
          { label: "Modelo", value: mandadero.motorcycle?.model },
          { label: "Placa", value: mandadero.motorcycle?.licensePlate },
          { label: "Color", value: mandadero.motorcycle?.color },
        ].map(({ label, value }) => (
          <div key={label} className="space-y-1">
            <label className="text-lg font-semibold block">{label}</label>
            <input
              value={value ?? "-"}
              disabled
              className="h-9 w-full rounded-md border px-3 bg-muted text-base"
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
