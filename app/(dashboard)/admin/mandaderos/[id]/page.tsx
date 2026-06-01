import { auth } from "@/auth";
import { getMandaderoById } from "@/services/mandadero.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function MandaderoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  const mandadero = await getMandaderoById(Number(id), session!.accessToken);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/mandaderos">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-bold">Detalle del Mandadero</h1>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex justify-center">
              <p className="text-base text-muted-foreground mb-2">
                Foto de perfil
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <p className="text-base font-bold text-muted-foreground">
                  Nombre
                </p>
                <p className="font-medium">
                  {mandadero.user?.profile?.name}{" "}
                  {mandadero.user?.profile?.lastName}
                </p>
              </div>
              <div>
                <p className="text-base font-bold text-muted-foreground">
                  Teléfono
                </p>
                <p className="font-medium">
                  {mandadero.user?.profile?.cellphone}
                </p>
              </div>
              <div>
                <p className="text-base font-bold text-muted-foreground">
                  Email
                </p>
                <p className="font-medium">{mandadero.user?.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-bold uppercase tracking-wide text-muted-foreground">
                Estado
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-base font-bold text-muted-foreground">
                  Estado
                </p>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                    mandadero.isActive
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400"
                      : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400"
                  }`}
                >
                  {mandadero.isActive ? "Activo" : "Inactivo"}
                </span>
              </div>
              <div>
                <p className="text-base font-bold text-muted-foreground">
                  Disponibilidad
                </p>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                    mandadero.available
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                  }`}
                >
                  {mandadero.available ? "Disponible" : "No disponible"}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-bold uppercase tracking-wide text-muted-foreground">
                Motocicleta
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-base font-bold text-muted-foreground">
                  Placa
                </p>
                <p className="font-medium">
                  {mandadero.motorcycle?.licensePlate ?? "-"}
                </p>
              </div>
              <div>
                <p className="text-base font-bold text-muted-foreground">
                  Marca
                </p>
                <p className="font-medium">
                  {mandadero.motorcycle?.brand ?? "-"}
                </p>
              </div>
              <div>
                <p className="text-base font-bold text-muted-foreground">
                  Modelo
                </p>
                <p className="font-medium">
                  {mandadero.motorcycle?.model ?? "-"}
                </p>
              </div>
              <div>
                <p className="text-base font-bold text-muted-foreground">
                  Color
                </p>
                <p className="font-medium">
                  {mandadero.motorcycle?.color ?? "-"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
