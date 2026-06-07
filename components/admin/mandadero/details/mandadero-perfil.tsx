import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mandadero } from "@/types/mandadero.type";

import { API_IMG_URL } from "@/config/config";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
type Props = {
  mandadero: Mandadero;
};

export const MandaderoPerfil = ({ mandadero }: Props) => {
  console.log("MANDADERO", mandadero.user?.profile);
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold uppercase tracking-wide">
          Perfil
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-4 py-3">
        <Avatar className="h-32 w-32">
          <AvatarImage
            src={
              mandadero.user?.profile?.profileImage
                ? `${API_IMG_URL}/uploads/profile/${mandadero.user.profile.profileImage}`
                : undefined
            }
            alt={`${mandadero.user?.profile?.name} ${mandadero.user?.profile?.lastName}`}
          />

          <AvatarFallback className="text-2xl font-bold">
            {mandadero.user?.profile?.name?.charAt(0).toUpperCase() ?? "?"}
            {mandadero.user?.profile?.lastName?.charAt(0).toUpperCase() ?? "?"}
          </AvatarFallback>
        </Avatar>

        <p className="text-lg font-bold text-center">
          {" "}
          {mandadero.user?.email}
        </p>

        <div className="w-full space-y-6">
          <div className="flex flex-col items-center gap-2">
            <p className="text-lg font-semibold">Estado</p>
            <span
              className={`inline-flex items-center justify-center w-3xs h-10 rounded-lg text-base font-semibold ${
                mandadero.isActive
                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400"
                  : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400"
              }`}
            >
              {mandadero.isActive ? "Activo" : "Inactivo"}
            </span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="text-lg font-semibold">Disponibilidad</p>
            <span
              className={`inline-flex items-center justify-center w-3xs h-10 rounded-lg text-base font-semibold ${
                mandadero.available
                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
              }`}
            >
              {mandadero.available ? "Disponible" : "No disponible"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
