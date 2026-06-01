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
import { ImageUploadField } from "@/components/shared/image-upload-field";
import { FormError } from "@/components/shared/form-error";

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

        <ImageUploadField
          onChangeAction={(file) => form.setValue("imageIdentification", file)}
          error={errors.imageIdentification?.message}
        />
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

        <ImageUploadField
          onChangeAction={(file) => form.setValue("circulationImage", file)}
          error={errors.circulationImage?.message}
        />

        <ImageUploadField
          onChangeAction={(file) => form.setValue("insuranceImage", file)}
          error={errors.insuranceImage?.message}
        />
      </div>

      <FormError message={error ?? undefined} />

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Guardando..." : "Crear Mandadero"}
      </Button>
    </form>
  );
};
