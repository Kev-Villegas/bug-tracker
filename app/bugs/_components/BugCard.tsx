"use client";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import BugActionsMenu from "./BugActionsMenu";
import BugStatusBadge from "./BugStatusBadge";
import BugPriorityBadge from "./BugPriorityBadge";
import { Priority, Status } from "@prisma/client";
import { Button } from "../../_components/ui/button";
import { Separator } from "@/app/_components/ui/separator";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";

interface BugCardProps {
  id: number;
  title: string;
  status: Status;
  summary: string;
  priority: Priority;
  assignedTo: string;
  updatedAt: string;
  createdAt: string;
}

export default function BugCard({
  id,
  title,
  status,
  summary,
  priority,
  createdAt,
  assignedTo,
}: BugCardProps) {
  const handleEdit = () => {
    console.log("Editing bug", id);
  };

  const handleDelete = () => {
    console.log("Bug deleted", id);
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
          <BugActionsMenu onEdit={handleEdit} onDeleteConfirm={handleDelete} />
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
            Created: {new Date(createdAt).toLocaleDateString("en-GB")}
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
    </Card>
  );
}
