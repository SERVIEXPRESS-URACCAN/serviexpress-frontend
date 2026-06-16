"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormField } from "@/components/shared/form-field";
import { FormSection } from "@/components/shared/form-section";
import { FormError } from "@/components/shared/form-error";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  UpdateMandaderoInput,
  updateMandaderoSchema,
} from "@/schemas/mandaderos.schema";
import { Mandadero } from "@/types/mandadero.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

type Props = {
  mandadero: Mandadero;
  onSubmitAction: (data: UpdateMandaderoInput) => Promise<void>;
  isSubmitting?: boolean;
  error?: string | null;
};

export const EditMandaderoForm = ({
  mandadero,
  onSubmitAction,
  isSubmitting,
  error,
}: Props) => {
  const form = useForm<UpdateMandaderoInput>({
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
  const { errors } = form.formState;
  const isActive = useWatch({ control: form.control, name: "isActive" });
  const available = useWatch({ control: form.control, name: "available" });

  useEffect(() => {
    form.reset({
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
  }, [mandadero, form]);

  return (
    <form onSubmit={form.handleSubmit(onSubmitAction)} className="space-y-4">
      <FormField label="Nombre" error={errors.profile?.name?.message}>
        <Input {...form.register("profile.name")} />
      </FormField>
      <FormField label="Apellido" error={errors.profile?.lastName?.message}>
        <Input {...form.register("profile.lastName")} />
      </FormField>
      <FormField
        label="Celular"
        error={
          errors.profile?.cellphone?.message ||
          (error?.toLowerCase().includes("dato duplicado")
            ? "Este teléfono ya está registrado"
            : undefined)
        }
      >
        <Input
          {...form.register("profile.cellphone")}
          inputMode="numeric"
          type="tel"
          maxLength={8}
        />
      </FormField>

      <FormSection title="Motocicleta" />

      <div className="grid grid-cols-2 gap-3">
        <FormField label="Marca" error={errors.motorcycle?.brand?.message}>
          <Input {...form.register("motorcycle.brand")} />
        </FormField>
        <FormField label="Modelo" error={errors.motorcycle?.model?.message}>
          <Input {...form.register("motorcycle.model")} />
        </FormField>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="Color" error={errors.motorcycle?.color?.message}>
          <Input {...form.register("motorcycle.color")} />
        </FormField>
        <FormField
          label="Placa"
          error={errors.motorcycle?.licensePlate?.message}
        >
          <Input {...form.register("motorcycle.licensePlate")} />
        </FormField>
      </div>
      <div className="flex items-center justify-between">
        <Label>Activo</Label>
        <Switch
          checked={isActive}
          onCheckedChange={(value) => {
            form.setValue("isActive", value);
            if (!value) form.setValue("available", false);
          }}
        />
      </div>
      <div className="flex items-center justify-between">
        <Label>Disponible</Label>
        <Select
          value={available ? "true" : "false"}
          onValueChange={(value) => {
            if (value === "true" && !isActive) return;
            form.setValue("available", value === "true");
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
      <FormError
        message={
          error?.toLowerCase().includes("dato duplicado")
            ? undefined
            : (error ?? undefined)
        }
      />
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Guardando..." : "Guardar Cambios"}
      </Button>
    </form>
  );
};
