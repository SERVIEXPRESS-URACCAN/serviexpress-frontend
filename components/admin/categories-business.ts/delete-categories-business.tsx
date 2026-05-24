"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CategoryBusiness } from "../../../types/categories-business";
import { Button } from "@/components/ui/button";
import { deleteCategoryBusiness } from "@/services/categories-business.service";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  CategoryBusiness: CategoryBusiness;
  open: boolean;
  onOpenChangeAction: (open: boolean) => void;
};

export const DeleteCategoryBusinessDialog = ({
  CategoryBusiness,
  open,
  onOpenChangeAction,
}: Props) => {
  const router = useRouter();

  const { session } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);

      await deleteCategoryBusiness(CategoryBusiness.id, session!.accessToken);

      onOpenChangeAction(false);
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChangeAction}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Eliminar categoría de negocio</DialogTitle>

          <DialogDescription>
            ¿Estás seguro de eliminar la categoría de negocio{" "}
            {CategoryBusiness.name}?
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChangeAction(false)}
            disabled={isLoading}
          >
            Cancelar
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Eliminando..." : "Eliminar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
