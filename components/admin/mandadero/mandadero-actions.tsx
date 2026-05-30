"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Mandadero } from "@/types/mandadero.type";
import { MoreVertical } from "lucide-react";

type Props = {
  mandadero: Mandadero;
  onEditAction: () => void;
};

export const MandaderoActions = ({ onEditAction }: Props) => {
  return (
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
        <DropdownMenuItem onClick={onEditAction}>Editar</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
