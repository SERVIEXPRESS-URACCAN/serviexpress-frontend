"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { error } from "console";

type Props = {
  defaultValues?: {
    name: string;
  };
  error?: string;
  onSubmitAction: (data: { name: string }) => Promise<void>;
  isLoading?: boolean;
};

export const CategoryBusinessForm = ({
  error,
  defaultValues,
  onSubmitAction,
  isLoading,
}: Props) => {
  const [name, setName] = useState(defaultValues?.name || "");

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    await onSubmitAction({
      name,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nombre</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre de la categoría del negocio"
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Guardando..." : "Guardar"}
      </Button>
    </form>
  );
};
