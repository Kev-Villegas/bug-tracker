"use client";

import Link from "next/link";
import { useState } from "react";
import BugStatusBadge from "./BugStatusBadge";
import BugPriorityBadge from "./BugPriorityBadge";
import { Priority, Status } from "@prisma/client";
import { Button } from "../../_components/ui/button";
import { Separator } from "@/app/_components/ui/separator";
import { EllipsisVertical, ExternalLink, Pencil, Trash2 } from "lucide-react";
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
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../_components/ui/dropdown-menu";

interface BugCardProps {
  id: number;
  title: string;

  status: Status;
  summary: string;
  priority: Priority;
  assignedTo: string;
}

export default function BugCard({
  id,
  title,
  status,
  summary,
  priority,
  assignedTo,
}: BugCardProps) {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    console.log("Bug deleted");
    setOpen(false);
  };

  return (
    <Card className="w-full max-w-md sm:max-w-full md:max-w-lg lg:max-w-md">
      <CardHeader className="mt-2">
        <div className="flex items-center justify-between">
          <CardTitle className="px-3 text-base text-slate-900">
            <Link href={`/bugs/${id}`}>{title}</Link>
          </CardTitle>
          <div className="flex">
            <span className="items-center rounded-full bg-neutral-200 px-1 text-base font-medium">
              #{id}
            </span>
          </div>
          <div>
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
                <DropdownMenuItem
                  className="group cursor-pointer"
                  onSelect={() => console.log("Edit")}
                >
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
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div>
          <span className="px-1 text-xs text-muted-foreground">{summary}</span>
        </div>
        <div className="flex justify-between px-1 text-sm font-medium text-slate-900">
          <span>Assigned To</span>
          <span className="text-sm font-medium text-slate-900">
            {assignedTo}
          </span>
        </div>
        <div className="flex justify-between px-1 text-sm font-medium text-slate-900">
          <span> Priority</span>
          <BugPriorityBadge priority={priority} />
        </div>
        <div className="flex justify-between px-1 text-sm font-medium text-slate-900">
          <span> Status</span>
          <BugStatusBadge status={status} />
        </div>
        <div className="mb-4 mt-4">
          <Separator className="border border-gray-300" />
        </div>
        <div className="flex items-center justify-between px-1 text-sm font-medium text-slate-900">
          <span className="text-sm text-muted-foreground">
            Created: {new Date().toLocaleDateString()}
          </span>
          <Button
            size="sm"
            variant="outline"
            className="flex items-center space-x-2"
          >
            <Link href={`/bugs/${id}`} className="flex items-center space-x-1">
              <ExternalLink className="mr-1 h-[14px] w-[14px] items-center text-center" />
              <span>View details</span>
            </Link>
          </Button>
        </div>
      </CardContent>
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
              onSelect={handleDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
