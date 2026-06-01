import { auth } from "@/auth";
import { getMandaderoById } from "@/services/mandadero.service";

export default async function MandaderoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();

  const mandadero = await getMandaderoById(Number(id), session!.accessToken);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Detalle del Mandadero</h1>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Datos personales</h2>
        <p>
          <strong>Nombre:</strong> {mandadero.user?.profile?.name}{" "}
          {mandadero.user?.profile?.lastName}
        </p>
        <p>
          <strong>Teléfono:</strong> {mandadero.user?.profile?.cellphone}
        </p>
        <p>
          <strong>Email:</strong> {mandadero.user?.email}
        </p>
        <p>
          <strong>Estado:</strong> {mandadero.isActive ? "Activo" : "Inactivo"}
        </p>
        <p>
          <strong>Disponible:</strong> {mandadero.available ? "Sí" : "No"}
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Motocicleta</h2>
        <p>
          <strong>Placa:</strong> {mandadero.motorcycle?.licensePlate ?? "-"}
        </p>
        <p>
          <strong>Marca:</strong> {mandadero.motorcycle?.brand ?? "-"}
        </p>
        <p>
          <strong>Modelo:</strong> {mandadero.motorcycle?.model ?? "-"}
        </p>
        <p>
          <strong>Color:</strong> {mandadero.motorcycle?.color ?? "-"}
        </p>
      </div>
    </div>
  );
}
