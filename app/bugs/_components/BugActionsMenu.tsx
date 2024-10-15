"use client";

import { useState } from "react";
import DeleteBugDialog from "./DeleteBugDialog";
import { Button } from "../../_components/ui/button";
import { Pencil, Trash2, EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../_components/ui/dropdown-menu";

interface BugActionsMenuProps {
  onEdit: () => void;
  onDeleteConfirm: () => void;
}

const BugActionsMenu: React.FC<BugActionsMenuProps> = ({
  onEdit,
  onDeleteConfirm,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDelete = () => {
    onDeleteConfirm();
    setIsDialogOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="rounded-full bg-transparent text-sm text-gray-900 hover:bg-accent"
            aria-label="More options"
          >
            <EllipsisVertical size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="group cursor-pointer" onSelect={onEdit}>
            <span className="flex group-hover:text-slate-950">
              <Pencil size={20} className="mr-1" />
              Edit
            </span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="group cursor-pointer"
            onSelect={() => setIsDialogOpen(true)}
          >
            <span className="flex group-hover:text-red-600">
              <Trash2 size={20} className="mr-1" /> Delete
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteBugDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title="Confirm Deletion"
        description="Are you sure you want to delete this bug ticket? This action cannot be undone."
        onConfirm={handleDelete}
        confirmLabel="Delete"
        cancelLabel="Cancel"
      />
    </>
  );
};

export default BugActionsMenu;
