"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import EditBugDialog from "./EditBugDialog";
import DeleteBugDialog from "./DeleteBugDialog";
import { Status, Priority } from "@prisma/client";
import { Button } from "@/app/_components/ui/button";
import { CircleArrowLeft, Trash2 } from "lucide-react";
import { Separator } from "@/app/_components/ui/separator";
import BugStatusBadge from "@/app/bugs/_components/BugStatusBadge";
import BugPriorityBadge from "@/app/bugs/_components/BugPriorityBadge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";

interface BugTicketDetailProps {
  id: number;
  title: string;
  summary: string;
  description: string;
  assignedTo: string;
  createdAt: Date;
  updatedAt: Date;
  status: Status;
  priority: Priority;
}

const BugTicketDetail: React.FC<BugTicketDetailProps> = ({
  id,
  title,
  status,
  summary,
  priority,
  createdAt,
  updatedAt,
  assignedTo,
  description,
}) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSave = async (updatedData: {
    title: string;
    summary: string;
    description: string;
    status: Status;
    priority: Priority;
  }) => {
    try {
      await axios.patch(`/api/bugs/${id}`, updatedData);
      toast.success("Bug Ticket updated successfully");
      router.push(`/bugs/${id}`);
      router.refresh();
    } catch (error) {
      console.error("Failed to update bug ticket", error);
      toast.error("Failed to update the bug ticket. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/bugs/${id}`);
      toast.success("Bug Ticket deleted successfully");
      router.push("/bugs");
      router.refresh();
    } catch (error) {
      console.error("Failed to delete bug ticket", error);
      toast.error("Failed to delete the bug ticket. Please try again.");
    } finally {
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Button
        variant="outline"
        className="mb-4 bg-gray-300 text-slate-900 hover:bg-gray-300"
        onClick={() => router.push("/bugs")}
      >
        <CircleArrowLeft className="mr-1" size={20} /> Back to All Tickets
      </Button>
      <Card>
        <CardHeader className="pt-4">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="mb-2 px-4 text-2xl">
                Bug Ticket #{id}
              </CardTitle>
              <p className="px-4 text-sm text-gray-600">{summary}</p>
            </div>
            <div className="flex flex-col items-start">
              <EditBugDialog
                title={title}
                summary={summary}
                description={description}
                status={status}
                priority={priority}
                createdAt={createdAt}
                updatedAt={updatedAt}
                onSave={handleSave}
              />
              <Button
                size="sm"
                variant="destructive"
                className="ml-[1px] mt-1"
                onClick={() => setIsDialogOpen(true)}
              >
                <Trash2 className="mr-1" size={16} />
                Delete Ticket
              </Button>
            </div>
          </div>
          <CardContent>
            <Separator className="mb-4 w-full border border-neutral-300" />
            <div className="space-y-4">
              <div className="flex justify-between">
                <BugStatusBadge status={status} />
                <BugPriorityBadge priority={priority} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-950">
                  Title
                </h3>
                <p className="text-sm font-medium text-neutral-600">{title}</p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-950">
                  Assigned to
                </h3>
                <p className="text-sm font-medium text-neutral-600">
                  {assignedTo}
                </p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-950">
                  Description
                </h3>
                <p className="text-sm font-medium text-neutral-600">
                  {description}
                </p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-950">
                  Summary
                </h3>
                <p className="text-sm font-medium text-neutral-600">
                  {summary}
                </p>
              </div>
            </div>
          </CardContent>
        </CardHeader>
      </Card>
      <DeleteBugDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title="Confirm Deletion"
        description="Are you sure you want to delete this bug ticket? This action cannot be undone"
        onConfirm={handleDelete}
        confirmLabel="Delete"
        cancelLabel="Cancel"
      />
    </div>
  );
};

export default BugTicketDetail;
