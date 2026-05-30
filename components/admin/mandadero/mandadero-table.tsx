"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Mandadero, MandaderoResponse } from "@/types/mandadero.type";
import { MandaderoActions } from "./mandadero-actions";
import { useState } from "react";
import { EditMandaderoDialog } from "./edit-mandadero-dialog";
import { TablePaginationInput } from "@/components/shared/table-pagination";
type Props = {
  mandaderos: MandaderoResponse;
  currentPage: number;
};

export const MandaderoTable = ({ mandaderos, currentPage }: Props) => {
  const [selectedMandadero, setSelectedMandadero] = useState<Mandadero | null>(
    null,
  );
  const [open, setOpen] = useState(false);
  const { pagination } = mandaderos;
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Apellido</TableHead>
              <TableHead>Telefono</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Disponible</TableHead>
              <TableHead>Activo</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {mandaderos.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No hay mandaderos disponibles
                </TableCell>
              </TableRow>
            ) : (
              mandaderos.data.map((mandadero) => (
                <TableRow key={mandadero.id}>
                  <TableCell>{mandadero.id}</TableCell>
                  <TableCell>{mandadero.user?.profile?.name}</TableCell>
                  <TableCell>{mandadero.user?.profile?.lastName}</TableCell>
                  <TableCell>{mandadero.user?.profile?.cellphone}</TableCell>
                  <TableCell>{mandadero.user?.email}</TableCell>

                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold backdrop-blur-sm transition-colors ${
                        mandadero.available
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {mandadero.available ? "Disponible" : "No disponible"}
                    </span>
                  </TableCell>

                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold transition-colors ${
                        mandadero.isActive
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400"
                          : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400"
                      }`}
                    >
                      {mandadero.isActive ? "Activo" : "Inactivo"}
                    </span>
                  </TableCell>

                  <TableCell>
                    <MandaderoActions
                      mandadero={mandadero}
                      onEditAction={() => {
                        setSelectedMandadero(mandadero);
                        setOpen(true);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between px-2">
        <p className="text-sm text-muted-foreground">
          Página {currentPage} de {pagination.lastPage}
        </p>

        <TablePaginationInput
          currentPage={currentPage}
          lastPage={pagination.lastPage}
        />
      </div>
      {selectedMandadero && (
        <EditMandaderoDialog
          key={`${selectedMandadero.id}-${selectedMandadero.user?.profile?.id}`}
          mandadero={selectedMandadero}
          open={open}
          onOpenChangeAction={setOpen}
        />
      )}
    </div>
  );
};
