import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Mandadero } from "@/types/mandadero.type";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import { EditMandaderoDialog } from "./edit-mandadero-dialog";

type Props = {
  mandadero: Mandadero;
};

export const MandaderoActions = ({ mandadero }: Props) => {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-muted focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
          >
            <MoreVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            Editar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* <EditMandaderoDialog
        mandadero={mandadero}
        open={editOpen}
        onOpenChangeAction={setEditOpen}
      /> */}
    </>
  );
};
