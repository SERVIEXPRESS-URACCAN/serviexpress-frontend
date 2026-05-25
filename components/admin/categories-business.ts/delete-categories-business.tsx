"use client";

import { CategoryBusiness } from "../../../types/categories-business";
import { deleteCategoryBusiness } from "@/services/categories-business.service";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal, { SweetAlertOptions } from "sweetalert2";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

const fireSwal = (options: SweetAlertOptions) =>
  new Promise<Awaited<ReturnType<typeof Swal.fire>>>((resolve) => {
    setTimeout(() => resolve(Swal.fire(options)), 300);
  });
type Props = {
  CategoryBusiness: CategoryBusiness;
};

export const DeleteCategoryBusinessDialog = ({ CategoryBusiness }: Props) => {
  const router = useRouter();

  const { session } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    const result = await fireSwal({
      title: "¿Estás seguro?",
      text: `Se eliminará la categoría "${CategoryBusiness.name}"`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc2626",
      theme: "auto",
    });

    if (!result.isConfirmed) return;

    try {
      setIsLoading(true);

      await deleteCategoryBusiness(CategoryBusiness.id, session!.accessToken);

      router.refresh();
      await fireSwal({
        title: "Eliminado",
        text: "La categoría fue eliminada correctamente",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        theme: "auto",
      });
    } catch {
      await fireSwal({
        title: "Error",
        text: "No se pudo eliminar la categoría",
        icon: "error",
        theme: "auto",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenuItem
      onClick={handleDelete}
      disabled={isLoading}
      className="text-red-500 focus:text-red-500"
    >
      {isLoading ? "Eliminando..." : "Eliminar"}
    </DropdownMenuItem>
  );
};
