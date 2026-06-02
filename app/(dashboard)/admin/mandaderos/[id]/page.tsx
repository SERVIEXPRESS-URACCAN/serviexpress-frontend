import { auth } from "@/auth";
import { getMandaderoById } from "@/services/mandadero.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

import { API_IMG_URL } from "@/config/config";
export default async function MandaderoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  const mandadero = await getMandaderoById(Number(id), session!.accessToken);

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center gap-3">
        <Button variant="ghost" asChild>
          <Link href="/admin/mandaderos">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-bold">Detalle del Mandadero</h1>
      </div>

      <div
        className="grid gap-6 items-stretch "
        style={{
          gridTemplateColumns: "1fr 1fr 1fr",
        }}
      >
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex flex-col items-center gap-2">
              <div className="w-40 aspect-square rounded-full overflow-hidden border-2 border-border bg-muted shrink-0 mx-auto">
                {" "}
                {mandadero.user?.profile?.image ? (
                  <Image
                    src={`${API_IMG_URL}/uploads/profiles/${mandadero.user.profile.image}`}
                    alt="Foto de perfil"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-3xl text-muted-foreground">
                      {mandadero.user?.profile?.name?.charAt(0).toUpperCase() ??
                        "?"}
                      {mandadero.user?.profile?.lastName
                        ?.charAt(0)
                        .toUpperCase() ?? "?"}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-lg font-bold block mb-1">Nombre</label>
                <input
                  value={`${mandadero.user?.profile?.name} `}
                  disabled
                  className="w-full rounded-md border px-4 py-2 text-base bg-muted  cursor-not-allowed"
                />
              </div>
              <div className="space-y-3">
                <label className="text-lg font-bold block mb-1">Apellido</label>
                <input
                  value={` ${mandadero.user?.profile?.lastName}`}
                  disabled
                  className="w-full rounded-md border px-4 py-2 text-base bg-muted  cursor-not-allowed"
                />
              </div>
              <div className="space-y-3">
                <label className="text-lg font-bold block mb-2">Teléfono</label>
                <input
                  value={mandadero.user?.profile?.cellphone}
                  disabled
                  className="w-full rounded-md border px-4 py-2 text-base bg-muted  cursor-not-allowed"
                />
              </div>
              <div className="space-y-3">
                <label className="text-lg font-bold block mb-2">Email</label>
                <input
                  value={mandadero.user?.email}
                  disabled
                  className="w-full rounded-md border px-4 py-2 text-base bg-muted  cursor-not-allowed"
                />
              </div>
              <div className="space-y-3">
                <label className="text-lg font-bold block mb-2">Genero</label>
                <input
                  value={mandadero.user?.profile?.gender?.name ?? "-"}
                  disabled
                  className="w-full rounded-md border px-4 py-2 text-base bg-muted  cursor-not-allowed"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-[3fr_7fr] gap-6 h-full">
          {" "}
          <Card className="h-full">
            {" "}
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold uppercase tracking-wide ">
                Estado
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 py-4 text-sm">
              {" "}
              <div className="flex flex-col items-center gap-4">
                <p className="text-lg font-bold mb-3">Estado</p>

                <span
                  className={`inline-flex items-center justify-center w-full px-4 py-4 rounded-xl text-xl font-bold ${
                    mandadero.isActive
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400"
                      : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400"
                  }`}
                >
                  {mandadero.isActive ? "Activo" : "Inactivo"}
                </span>
              </div>
              <div className="flex flex-col items-center gap-4">
                <p className="text-lg font-bold  mb-3 ">Disponibilidad</p>
                <span
                  className={`inline-flex items-center justify-center w-full px-4 py-4 rounded-xl text-xl font-bold ${
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
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold uppercase tracking-wide">
                Motocicleta
              </CardTitle>
            </CardHeader>
            <CardContent className="h-full flex flex-col justify-center gap-4 text-sm">
              <div>
                <label className="text-lg font-bold ">Placa</label>
                <input
                  value={mandadero.motorcycle?.licensePlate ?? "-"}
                  disabled
                  className="w-full rounded-md border px-3 py-2 text-base bg-muted  cursor-not-allowed"
                />
              </div>
              <div>
                <label className="text-lg font-bold ">Marca</label>
                <input
                  value={mandadero.motorcycle?.brand ?? "-"}
                  disabled
                  className="w-full rounded-md border px-3 py-2 text-base bg-muted  cursor-not-allowed"
                />
              </div>
              <div>
                <label className="text-lg font-bold ">Modelo</label>
                <input
                  value={mandadero.motorcycle?.model ?? "-"}
                  disabled
                  className="w-full rounded-md border px-3 py-2 text-base bg-muted  cursor-not-allowed"
                />
              </div>
              <div>
                <label className="text-lg font-bold ">Color</label>
                <input
                  value={mandadero.motorcycle?.color ?? "-"}
                  disabled
                  className="w-full rounded-md border px-3 py-2 text-base bg-muted  cursor-not-allowed"
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold uppercase tracking-wide">
              Imágenes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-4">
              <label className="text-base font-bold block mb-2">
                Licencia de Conducir
              </label>

              <Image
                src={`${API_IMG_URL}/uploads/mandaderos/${mandadero.imageIdentification}`}
                alt="Identificación"
                width={300}
                height={250}
                unoptimized
                className="rounded-md object-contain max-h-48"
              />
            </div>
            <div className="space-y-4">
              <label className="text-base font-bold block mb-2">
                Tarjeta de circulación
              </label>
              {mandadero.motorcycle?.circulationImage ? (
                <Image
                  src={`${API_IMG_URL}/uploads/motorcycles/${mandadero.motorcycle.circulationImage}`}
                  alt="Circulación"
                  width={300}
                  height={250}
                  unoptimized
                  className="rounded-md object-contain max-h-48 "
                />
              ) : (
                <p className="text-sm text-muted-foreground">Sin imagen</p>
              )}
            </div>
            <div className="space-y-4">
              <label className="text-base font-bold">Seguro</label>
              {mandadero.motorcycle?.insuranceImage ? (
                <Image
                  src={`${API_IMG_URL}/uploads/motorcycles/${mandadero.motorcycle.insuranceImage}`}
                  alt="Seguro"
                  width={300}
                  height={250}
                  unoptimized
                  className="rounded-md object-contain max-h-48"
                />
              ) : (
                <p className="text-sm text-muted-foreground">Sin imagen</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
