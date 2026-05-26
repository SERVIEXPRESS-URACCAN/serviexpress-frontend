"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import {
  createCategoryBusiness,
  restoreCategoryBusiness,
} from "@/services/categories-business.service";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CategoryBusinessForm } from "./categories-business-form";
import { CategoryConflictException } from "@/types/api-errors.types";
import Swal from "sweetalert2";

export const CreateCategoryBusinessDialog = () => {
  const router = useRouter();
  const { session } = useAuth();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConflict = async (error: CategoryConflictException) => {
    if (!error.data.canRestore) {
      await Swal.fire({
        icon: "error",
        title: "Categoría duplicada",
        text: error.message,
      });
      return;
    }

    const result = await Swal.fire({
      icon: "question",
      title: "¿Restaurar categoría?",
      text: error.data.message,
      showCancelButton: true,
      confirmButtonText: "Sí, restaurar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#dc2626",
    });
    if (!result.isConfirmed) return;

    try {
      await restoreCategoryBusiness(error.data.id, session!.accessToken);
      setOpen(false);
      router.refresh();

      await Swal.fire({
        icon: "success",
        title: "Categoría restaurada",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (restoreError) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text:
          restoreError instanceof Error
            ? restoreError.message
            : "Error al restaurar la categoría",
      });
    }
  };

  const handleCreate = async (data: { name: string }) => {
    try {
      setIsLoading(true);
      setError("");

      await createCategoryBusiness(data, session!.accessToken);
      setOpen(false);
      router.refresh();

      await Swal.fire({
        icon: "success",
        title: "Categoría creada",
        text: `La categoría "${data.name}" fue creada exitosamente.`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error: unknown) {
      if (error instanceof CategoryConflictException) {
        await handleConflict(error);
        return;
      }

      setError(
        error instanceof Error ? error.message : "Error al crear la categoría",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (!value) setError("");
      }}
    >
      <DialogTrigger asChild>
        <Button>Nueva categoría de negocio</Button>
      </DialogTrigger>

      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Crear categoría de negocio</DialogTitle>
        </DialogHeader>
        <CategoryBusinessForm
          onSubmitAction={handleCreate}
          isLoading={isLoading}
          error={error}
        />
      </DialogContent>
    </Dialog>
  );
};
