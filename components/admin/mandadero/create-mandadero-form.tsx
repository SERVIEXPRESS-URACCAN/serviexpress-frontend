"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CreateMandaderoInput,
  createMandaderoSchema,
} from "@/schemas/mandaderos.schema";
import { CreateMandaderoAdminDto } from "@/types/mandadero.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, UseFormSetError } from "react-hook-form";
import { UserSearch } from "./search-mandadero-user";
import { User } from "@/types/user.type";
import { FormField } from "@/components/shared/form-field";
import { FormSection } from "@/components/shared/form-section";
import { FormError } from "@/components/shared/form-error";
import { Label } from "@/components/ui/label";

type Props = {
  users: User[];
  onSubmitAction: (
    data: CreateMandaderoAdminDto,
    setError: UseFormSetError<CreateMandaderoInput>,
  ) => Promise<void>;

  isLoading?: boolean;
  error?: string | null;
};

export const MandaderoForm = ({
  users,
  onSubmitAction,
  isLoading,
  error,
}: Props) => {
  const form = useForm<CreateMandaderoInput>({
    resolver: zodResolver(createMandaderoSchema),
  });
  const {
    formState: { errors },
  } = form;
  const onSubmit = async (data: CreateMandaderoInput) => {
    await onSubmitAction(data as CreateMandaderoAdminDto, form.setError);
  };
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-3">
        <div className="space-y-2">
          <FormField label="Usuario" error={errors.userId?.message}>
            <Controller
              control={form.control}
              name="userId"
              render={({ field }) => (
                <UserSearch
                  users={users}
                  value={field.value as number | undefined}
                  onChangeAction={field.onChange}
                />
              )}
            />
          </FormField>
        </div>

        <div className="space-y-2">
          <Label>Imagen de la Licencia</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) form.setValue("imageIdentification", file);
            }}
          />
          {errors.imageIdentification && (
            <p className="text-xs text-red-400">
              {errors.imageIdentification.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <FormSection title="Datos de la motocicleta" />

        <div className="grid grid-cols-2 gap-3">
          <FormField label="Marca" error={errors.brand?.message}>
            <Input {...form.register("brand")} placeholder="Honda" />
          </FormField>

          <FormField label="Modelo" error={errors.model?.message}>
            <Input {...form.register("model")} placeholder="XR" />
          </FormField>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <FormField label="Color" error={errors.color?.message}>
            <Input {...form.register("color")} placeholder="Blanco" />
          </FormField>
          <FormField label="Placa" error={errors.licensePlate?.message}>
            <Input {...form.register("licensePlate")} placeholder="ZC9811" />
          </FormField>
        </div>

        <div className="space-y-2">
          <Label>Tarjeta de circulación</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) form.setValue("circulationImage", file);
            }}
          />
          {errors.circulationImage && (
            <p className="text-xs text-red-400">
              {errors.circulationImage.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Seguro</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) form.setValue("insuranceImage", file);
            }}
          />
          {errors.insuranceImage && (
            <p className="text-xs text-red-400">
              {errors.insuranceImage.message}
            </p>
          )}
        </div>
      </div>

      <FormError message={error ?? undefined} />

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Guardando..." : "Crear Mandadero"}
      </Button>
    </form>
  );
};
