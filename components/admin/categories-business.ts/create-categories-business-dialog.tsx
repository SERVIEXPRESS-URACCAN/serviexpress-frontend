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
import { createCategoryBusiness } from "@/services/categories-business.service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CategoryBusinessForm } from "./categories-business-form";

export const CreateCategoryBusinessDialog = () => {
  const router = useRouter();
  const { session } = useAuth();

  const [open, setOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async (data: { name: string }) => {
    try {
      setIsLoading(true);

      await createCategoryBusiness(data, session!.accessToken);

      setOpen(false);

      router.refresh();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        />
      </DialogContent>
    </Dialog>
  );
};
