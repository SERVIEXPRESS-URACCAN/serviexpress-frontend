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
} from "@/services/mandadero.service";
import { Mandadero } from "@/types/mandadero.type";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: mandadero.user?.profile?.name || "",
    lastName: mandadero.user?.profile?.lastName || "",
    cellphone: mandadero.user?.profile?.cellphone || "",
    available: mandadero.available,
    isActive: mandadero.isActive,
  });

  const handleSave = async () => {
    if (!session) return;

    const profileId = mandadero.user?.profile?.id;
    if (!profileId) {
      return;
    }

    try {
      setIsLoading(true);

      await updateMandaderoProfile(profileId, session!.accessToken, {
        name: formData.name,
        lastName: formData.lastName,
        cellphone: formData.cellphone,
      });
      await updateMandaderoAvailability(
        mandadero.id,
        session!.accessToken,
        formData.available,
      );
      await updateMandaderoActive(
        mandadero.id,
        session!.accessToken,
        formData.isActive,
      );

      onOpenChangeAction(false);
      router.refresh();
    } catch (error) {
      console.error("Error updating mandadero:", error);
    } finally {
      setIsLoading(false);
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

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Nombre</Label>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Apellido</Label>
            <Input
              value={formData.lastName}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  lastName: e.target.value,
                }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Telefono</Label>
            <Input
              value={formData.cellphone}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, cellphone: e.target.value }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label>Activo</Label>
            <Switch
              checked={formData.isActive}
              onCheckedChange={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  isActive: value,
                  available: !value ? false : prev.available,
                }));
              }}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label>Disponible</Label>
            <Switch
              checked={formData.available}
              onCheckedChange={(value) => {
                if (value && !formData.isActive) return;
                setFormData((prev) => ({
                  ...prev,
                  available: value,
                }));
              }}
              disabled={!formData.isActive}
            />
          </div>

          <Button onClick={handleSave} disabled={isLoading} className="w-full">
            {isLoading ? "Guardando..." : "Guardar cambios"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
