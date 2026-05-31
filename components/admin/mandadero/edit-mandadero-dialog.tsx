"use client";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  Dialog,
  DialogDescription,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { updateMandaderoProfile } from "@/services/mandadero-profile.service";
import {
  updateMandaderoActive,
  updateMandaderoAvailability,
  updateMotorcycle,
} from "@/services/mandadero.service";
import { Mandadero } from "@/types/mandadero.type";
import { useRouter } from "next/navigation";
import {
  UpdateMandaderoInput,
  updateMandaderoSchema,
} from "@/schemas/mandaderos.schema";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  mandadero: Mandadero;
  open: boolean;
  onOpenChangeAction: (open: boolean) => void;
};

export const EditMandaderoDialog = ({
  mandadero,
  open,
  onOpenChangeAction,
}: Props) => {
  const router = useRouter();
  const { session } = useAuth();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateMandaderoInput>({
    resolver: zodResolver(updateMandaderoSchema),
    defaultValues: {
      profile: {
        name: mandadero.user?.profile?.name || "",
        lastName: mandadero.user?.profile?.lastName || "",
        cellphone: mandadero.user?.profile?.cellphone || "",
      },
      available: mandadero.available,
      isActive: mandadero.isActive,
      motorcycle: {
        licensePlate: mandadero.motorcycle.licensePlate || "",
        brand: mandadero.motorcycle.brand || "",
        model: mandadero.motorcycle.model || "",
        color: mandadero.motorcycle.color || "",
      },
    },
  });
  useEffect(() => {
    if (open) {
      reset({
        profile: {
          name: mandadero.user?.profile?.name || "",
          lastName: mandadero.user?.profile?.lastName || "",
          cellphone: mandadero.user?.profile?.cellphone || "",
        },
        available: mandadero.available,
        isActive: mandadero.isActive,
        motorcycle: {
          licensePlate: mandadero.motorcycle?.licensePlate || "",
          brand: mandadero.motorcycle?.brand || "",
          model: mandadero.motorcycle?.model || "",
          color: mandadero.motorcycle?.color || "",
        },
      });
    }
  }, [open, mandadero, reset]);

  const isActive = useWatch({ control, name: "isActive" });
  const available = useWatch({ control, name: "available" });

  const onSubmit = async (data: UpdateMandaderoInput) => {
    if (!session) return;

    const profileId = mandadero.user?.profile?.id;
    if (!profileId) return;

    try {
      await updateMotorcycle(
        mandadero.motorcycle.id,
        session.accessToken,
        data.motorcycle,
      );

      await updateMandaderoProfile(
        profileId,
        session!.accessToken,
        data.profile,
      );

      await updateMandaderoActive(
        mandadero.id,
        session!.accessToken,
        data.isActive,
      );

      await updateMandaderoAvailability(
        mandadero.id,
        session!.accessToken,
        data.available,
      );

      onOpenChangeAction(false);
      router.refresh();
    } catch (error) {
      console.error("Error updating mandadero:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChangeAction}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Mandadero</DialogTitle>
          <DialogDescription>
            Edita la información del mandadero.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>Nombre</Label>
            <Input {...register("profile.name")} />
            {errors.profile?.name && (
              <p className="text-sm text-red-500">
                {errors.profile.name.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Apellido</Label>
            <Input {...register("profile.lastName")} />
            {errors.profile?.lastName && (
              <p className="text-sm text-red-500">
                {errors.profile.lastName.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Telefono</Label>
            <Input {...register("profile.cellphone")} />
            {errors.profile?.cellphone && (
              <p className="text-sm text-red-500">
                {errors.profile.cellphone.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Motocicleta
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Marca</Label>
              <Input {...register("motorcycle.brand")} />
              {errors.motorcycle?.brand && (
                <p className="text-sm text-red-500">
                  {errors.motorcycle.brand.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Modelo</Label>
              <Input {...register("motorcycle.model")} />
              {errors.motorcycle?.model && (
                <p className="text-sm text-red-500">
                  {errors.motorcycle.model.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Color</Label>
              <Input {...register("motorcycle.color")} />
              {errors.motorcycle?.color && (
                <p className="text-sm text-red-500">
                  {errors.motorcycle.color.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Placa</Label>
              <Input {...register("motorcycle.licensePlate")} />
              {errors.motorcycle?.licensePlate && (
                <p className="text-sm text-red-500">
                  {errors.motorcycle.licensePlate.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Label>Activo</Label>
            <Switch
              checked={isActive}
              onCheckedChange={(value) => {
                setValue("isActive", value);
                if (!value) setValue("available", false);
              }}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label>Disponible</Label>
            <Select
              value={available ? "true" : "false"}
              onValueChange={(value) => {
                if (value === "true" && !isActive) return;
                setValue("available", value === "true");
              }}
              disabled={!isActive}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Disponible</SelectItem>
                <SelectItem value="false">No disponible</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
