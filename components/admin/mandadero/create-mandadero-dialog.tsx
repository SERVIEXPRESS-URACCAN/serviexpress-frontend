"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { createMandaderoAdmin, getUsers } from "@/services/mandadero.service";
import { CreateMandaderoAdminDto } from "@/types/mandadero.type";
import { useEffect, useState } from "react";
import { MandaderoForm } from "./mandadero-form";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { UseFormSetError } from "react-hook-form";
import { CreateMandaderoInput } from "@/schemas/mandaderos.schema";

type Props = {
  open: boolean;
  onOpenChangeAction: (open: boolean) => void;
};

export const CreateMandaderoDialog = ({ open, onOpenChangeAction }: Props) => {
  const router = useRouter();
  const { session } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<{ id: number; email: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (open && session) {
      getUsers(session.accessToken).then((res) => {
        const data = res as unknown as {
          data: { id: number; email: string }[];
        };
        setUsers(data.data);
      });
    }
  }, [open, session]);

  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => setError(null), 0);
      return () => clearTimeout(timer);
    }
  }, [open]);
  const handleSubmit = async (
    data: CreateMandaderoAdminDto,
    setFieldError: UseFormSetError<CreateMandaderoInput>,
  ) => {
    if (!session) return;
    setError(null);

    try {
      setIsLoading(true);
      await createMandaderoAdmin(session.accessToken, data);
      router.refresh();
      await Swal.fire({
        icon: "success",
        title: "Mandadero creado",
        text: `El mandadero "${data.name}" fue creado exitosamente.`,
        timer: 2000,
        showConfirmButton: false,
      });
      onOpenChangeAction(false);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Error al crear el mandadero";
      if (message.toLowerCase().includes("placa")) {
        setFieldError("licensePlate", {
          message: "Esta placa ya está registrada",
        }); // 👈 va al campo
      } else {
        setError(message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChangeAction}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Crear Mandadero</DialogTitle>
          <DialogDescription>
            Completa los datos para registrar un nuevo mandadero.
          </DialogDescription>
        </DialogHeader>
        <MandaderoForm
          users={users}
          onSubmitAction={handleSubmit}
          isLoading={isLoading}
          error={error}
        />
      </DialogContent>
    </Dialog>
  );
};
