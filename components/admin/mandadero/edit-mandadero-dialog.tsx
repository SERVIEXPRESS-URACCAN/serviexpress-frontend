import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { updateMandadero } from "@/services/mandadero.service";
import { Mandadero, UpdateMandaderoDto } from "@/types/mandadero.type";
import { useRouter } from "next/navigation";
import { Dialog } from "radix-ui";
import { useState } from "react";
import { MandaderoForm } from "./mandadero-form";

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
  const Router = useRouter();
  const { session } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async (data: UpdateMandaderoDto) => {
    try {
      setIsLoading(true);

      await updateMandadero(mandadero.id, session!.accessToken, data);

      onOpenChangeAction(false);

      Router.refresh();
    } finally {
      setIsLoading(false);
    }
  };
};
