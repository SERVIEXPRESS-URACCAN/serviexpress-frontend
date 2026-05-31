"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CreateMandaderoInput,
  createMandaderoSchema,
} from "@/schemas/mandaderos.schema";
import { CreateMandaderoAdminDto } from "@/types/mandadero.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, UseFormSetError } from "react-hook-form";
import { UserSearch } from "./search-mandadero-user";

type Props = {
  users: { id: number; email: string }[];
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
  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    formState: { errors },
  } = useForm<CreateMandaderoInput>({
    resolver: zodResolver(createMandaderoSchema),
  });
  const handleFile = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: "imageIdentification" | "circulationImage" | "insuranceImage",
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue(key, file);
    }
  };

  const onSubmit = async (data: CreateMandaderoInput) => {
    await onSubmitAction(data as CreateMandaderoAdminDto, setError);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">
          Datos personales
        </h3>

        <div className="space-y-2">
          <Label>Usuario</Label>
          <Controller
            control={control}
            name="userId"
            render={({ field }) => (
              <UserSearch
                users={users}
                value={field.value as number | undefined}
                onChangeAction={field.onChange}
              />
            )}
          />
          {errors.userId && (
            <p className="text-xs text-red-400">{errors.userId.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label>Nombre</Label>
            <Input {...register("name")} placeholder="Nombre" />
            {errors.name && (
              <p className="text-xs text-red-400">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Apellido</Label>
            <Input {...register("lastName")} placeholder="Apellido" />
            {errors.lastName && (
              <p className="text-xs text-red-400">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Teléfono</Label>
          <Input {...register("cellphone")} placeholder="Teléfono" />
          {errors.cellphone && (
            <p className="text-xs text-red-400">{errors.cellphone.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Imagen de la Licencia</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleFile(e, "imageIdentification")}
          />
          {errors.imageIdentification && (
            <p className="text-xs text-red-400">
              {errors.imageIdentification.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">
          Datos de la motocicleta
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label>Marca</Label>
            <Input {...register("brand")} placeholder="Honda" />
          </div>
          <div className="space-y-2">
            <Label>Modelo</Label>
            <Input {...register("model")} placeholder="XR" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label>Color</Label>
            <Input {...register("color")} placeholder="Blanco" />
          </div>
          <div className="space-y-2">
            <Label>Placa</Label>
            <Input {...register("licensePlate")} placeholder="ZC9811" />
            {errors.licensePlate && (
              <p className="text-xs text-red-400">
                {errors.licensePlate.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Imagen de la Circulación</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleFile(e, "circulationImage")}
          />
          {errors.circulationImage && (
            <p className="text-xs text-red-400">
              {errors.circulationImage.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Imagen del Seguro</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleFile(e, "insuranceImage")}
          />
          {errors.insuranceImage && (
            <p className="text-xs text-red-400">
              {errors.insuranceImage.message}
            </p>
          )}
        </div>
      </div>
      {error && <p className="text-sm text-red-400 text-center">{error}</p>}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Guardando..." : "Crear Mandadero"}
      </Button>
    </form>
  );
};
