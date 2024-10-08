"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Avatar, AvatarFallback } from "@/app/_components/ui/avatar";
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
} from "./ui/dropdown-menu";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { useState } from "react";

interface BugCardProps {
  title: string;
  description: string;
  assignedTo: string;
  status: "open" | "in-progress" | "resolved";
}

export default function BugCard(
  { title, description, assignedTo, status }: BugCardProps = {
    title: "Login Page Error",
    description: "Users are unable to log in using their Google accounts.",
    assignedTo: "John Doe",
    status: "open",
  },
) {
  const [open, setOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-red-100 text-red-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleDelete = () => {
    console.log("Bug deleted");
    setOpen(false);
  };

  return (
    <Card className="w-full max-w-md sm:max-w-full md:max-w-lg lg:max-w-md">
      <CardHeader className="mt-2">
        <div className="flex items-center justify-between">
          <CardTitle className="px-3 text-base text-slate-900 sm:text-lg md:text-xl">
            {title}
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="rounded-full bg-transparent text-gray-900 hover:bg-accent"
                aria-label="More options"
              >
                <EllipsisVertical className="h-5 w-5" />
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
      </CardHeader>

      <CardContent>
        <p className="mb-4 px-1 text-xs text-gray-500 sm:text-sm md:text-base lg:text-lg">
          {description}
        </p>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{getInitials(assignedTo)}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-slate-900">
              {assignedTo}
            </span>
          </div>
          <Badge className={`${getStatusColor(status)} capitalize`}>
            {status.replace("-", " ")}
          </Badge>
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
