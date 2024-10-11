"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../../_components/ui/button";
import { EllipsisVertical } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../_components/ui/alert-dialog";
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

export default function BugActionsMenu({
  onEdit,
  onDeleteConfirm,
}: BugActionsMenuProps) {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    onDeleteConfirm();
    setOpen(false);
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
            onSelect={() => setOpen(true)}
          >
            <span className="flex group-hover:text-red-600">
              <Trash2 size={20} className="mr-1" /> Delete
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this bug ticket? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="hover:bg-gray-300">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-700 hover:bg-red-700"
              onClick={handleDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
