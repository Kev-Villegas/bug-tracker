"use client";

import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { Bug } from "@prisma/client";
import { useRouter } from "next/navigation";
import { ExternalLink } from "lucide-react";
import useUsers from "@/app/_hooks/useUsers";
import BugActionsMenu from "./BugActionsMenu";
import BugStatusBadge from "./BugStatusBadge";
import BugPriorityBadge from "./BugPriorityBadge";
import { Button } from "../../_components/ui/button";
import { Separator } from "@/app/_components/ui/separator";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/app/_components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";

interface BugCardProps {
  bug: Bug;
}

export default function BugCard({ bug }: BugCardProps) {
  const { id, title, status, summary, priority, createdAt, assignedToUserId } =
    bug;

  const router = useRouter();
  const { data: users } = useUsers();
  const assignedUser = users?.find((user) => user.id === assignedToUserId);

  const handleEdit = () => {
    console.log("Editing bug", id);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/bugs/${id}`);
      toast.success("Bug deleted successfully");
      router.refresh();
      location.reload();
    } catch (error) {
      console.error("Error deleting bug", error);
      toast.error("Failed to delete the bug. Please try again.");
    }
  };
  const getInitials = (name: string) => {
    const [firstName, lastName] = name.split(" ");
    return (firstName?.charAt(0) || "") + (lastName?.charAt(0) || "");
  };

  return (
    <Card className="w-full max-w-md sm:max-w-full md:max-w-lg lg:max-w-md">
      <CardHeader className="mt-2">
        <div className="flex items-center justify-between">
          <CardTitle className="px-3 text-base text-slate-900">
            <Link href={`/bugs/${id}`}>{title}</Link>
          </CardTitle>
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-gray-500 px-[6px] text-sm font-semibold text-white shadow-md transition duration-300 ease-in-out">
              #{id}
            </span>
            <BugActionsMenu
              onEdit={handleEdit}
              onDeleteConfirm={handleDelete}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div>
          <span className="px-1 text-xs text-muted-foreground">{summary}</span>
        </div>
        <div className="flex justify-between px-1 text-sm font-medium text-slate-900">
          <span className="flex items-center">Assigned To</span>
          <div className="flex items-center space-x-2">
            {assignedUser ? (
              <>
                {assignedUser.image ? (
                  <Avatar>
                    <AvatarImage
                      src={assignedUser.image}
                      alt={assignedUser.name || "Unassigned"}
                    />
                    <AvatarFallback>
                      {getInitials(assignedUser.name || "Unassigned")}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 font-bold text-white">
                    {getInitials(assignedUser.name || "Unassigned")}
                  </div>
                )}
                <span className="text-sm font-medium text-slate-900">
                  {assignedUser.name}
                </span>
              </>
            ) : (
              <span className="text-sm text-muted-foreground">Unassigned</span>
            )}
          </div>
        </div>
        <div className="flex justify-between px-1 pt-2 text-sm font-medium text-slate-900">
          <span className="flex items-center">Priority</span>
          <BugPriorityBadge priority={priority} />
        </div>
        <div className="flex justify-between px-1 text-sm font-medium text-slate-900">
          <span className="flex items-center">Status</span>
          <BugStatusBadge status={status} />
        </div>
        <div className="mb-4 mt-4">
          <Separator className="border border-gray-300" />
        </div>
        <div className="flex items-center justify-between px-1 text-sm font-medium text-slate-900">
          <span className="text-sm text-muted-foreground">
            Created: {new Date(createdAt).toLocaleDateString("en-GB")}
          </span>
          <Button
            size="sm"
            variant="outline"
            className="flex items-center space-x-2 hover:bg-muted-foreground hover:text-gray-300"
          >
            <Link href={`/bugs/${id}`} className="flex items-center space-x-1">
              <ExternalLink className="mr-1 h-[14px] w-[14px] items-center text-center" />
              <span>View details</span>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
