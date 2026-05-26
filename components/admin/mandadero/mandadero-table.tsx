"use client";

import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "@/components/ui/table";
import { Mandadero } from "@/types/mandadero.type";

type Props = { mandaderos: Mandadero[] };

export const MandaderoTable = ({ mandaderos }: Props) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Disponible</TableHead>
            <TableHead>Activo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mandaderos.map((mandadero) => (
            <TableRow key={mandadero.id}>
              <TableCell>{mandadero.id}</TableCell>
              <TableCell>{mandadero.user?.profile?.name} </TableCell>
              <TableCell>{mandadero.user?.profile?.lastName}</TableCell>
              <TableCell>{mandadero.user?.email}</TableCell>
              <TableCell>
                <span
                  className={
                    mandadero.available ? "text-green-600" : "text-red-600"
                  }
                >
                  {mandadero.available ? "Disponible" : "No disponible"}
                </span>
              </TableCell>

              <TableCell>
                <span
                  className={
                    mandadero.isActive ? "text-green-600" : "text-red-600"
                  }
                >
                  {mandadero.isActive ? "Activo" : "Inactivo"}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
