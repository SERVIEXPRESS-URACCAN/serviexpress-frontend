"use client";

import { useAuth } from "@/hooks/useAuth";
import { updateCategoryBusiness } from "@/services/categories-business.service";
import {
  CategoryBusiness,
  UpdateCategoryBusinessDto,
} from "@/types/categories-business";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CategoryBusinessForm } from "./categories-business-form";

type Props = {
  CategoryBusiness: CategoryBusiness;
  open: boolean;
  onOpenChangeAction: (open: boolean) => void;
};
export const EditCategorBusinessDialog = ({
  CategoryBusiness,
  open,
  onOpenChangeAction,
}: Props) => {
  const router = useRouter();
  const { session } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const handleUpdate = async (data: UpdateCategoryBusinessDto) => {
    try {
      setIsLoading(true);
      setError("");

      await updateCategoryBusiness(
        CategoryBusiness.id,
        data,
        session!.accessToken,
      );

      onOpenChangeAction(false);

      router.refresh();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Error actualizando categoría");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChangeAction}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Editar categoría de negocio</DialogTitle>
        </DialogHeader>

        <CategoryBusinessForm
          defaultValues={{
            name: CategoryBusiness.name,
          }}
          error={error}
          onSubmitAction={handleUpdate}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};
