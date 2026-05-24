"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CategoryBusiness } from "@/types/categories-business";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import { EditCategorBusinessDialog } from "./edit-catergories-business-dialog";
import { DeleteCategoryBusinessDialog } from "./delete-categories-business";

type Props = {
  categoryBusiness: CategoryBusiness;
};

export const CategoryBusinessActions = ({ categoryBusiness }: Props) => {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

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

          <DropdownMenuItem
            onClick={() => setDeleteOpen(true)}
            className="text-red-500 focus:text-red-500"
          >
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditCategorBusinessDialog
        CategoryBusiness={categoryBusiness}
        open={editOpen}
        onOpenChangeAction={setEditOpen}
      />
      <DeleteCategoryBusinessDialog
        CategoryBusiness={categoryBusiness}
        open={deleteOpen}
        onOpenChangeAction={setDeleteOpen}
      />
    </>
  );
};
