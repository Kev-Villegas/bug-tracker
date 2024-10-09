"use client";

import { useState } from "react";
import { Status } from "@prisma/client";
import { Priority } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Label } from "@/app/_components/ui/label";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { Textarea } from "@/app/_components/ui/textarea";
import { Separator } from "@/app/_components/ui/separator";
import BugStatusBadge from "@/app/_components/BugStatusBadge";
import { Ban, CircleArrowLeft, Pencil, Save } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import BugPriorityBadge from "@/app/_components/BugPriorityBadge";

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

export default function BugTicketDetail({
  id,
  title,
  status,
  summary,
  priority,
  createdAt,
  updatedAt,
  assignedTo,
  description,
}: BugTicketDetailProps) {
  const router = useRouter();
  const [editStatus, setEditStatus] = useState(status);
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleStatusChange = (value: string) => setEditStatus(value as Status);

  const handleCancel = () => {
    setDialogOpen(false);
    router.push(`/bugs/${id}`);
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
            <div>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="mr-3">
                    <Pencil className="mr-1" size={18} /> Edit Ticket
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Bug Ticket</DialogTitle>
                    <DialogDescription>
                      Make changes to the bug ticket here.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right">
                        Title
                      </Label>
                      <Input id="title" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        className="col-span-3 resize-none"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="status" className="text-right">
                        Status
                      </Label>
                      <Select
                        onValueChange={handleStatusChange}
                        defaultValue={editStatus}
                      >
                        <SelectTrigger className="col-span-3 border border-gray-400">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent className="border border-gray-700">
                          <SelectItem value="Open">Open</SelectItem>
                          <SelectItem value="In Progress">
                            In Progress
                          </SelectItem>
                          <SelectItem value="Closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="assignedTo" className="text-right">
                        Assigned To
                      </Label>
                      <Input id="assignedTo" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="assignedTo" className="text-right">
                        Created At
                      </Label>
                      <Input
                        id="assignedTo"
                        value={createdAt.toLocaleDateString()}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="assignedTo" className="text-right">
                        Updated At
                      </Label>
                      <Input
                        id="assignedTo"
                        value={updatedAt.toLocaleDateString()}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter className="flex justify-between">
                    <Button
                      type="button"
                      variant="destructive"
                      className="flex items-center"
                      onClick={handleCancel}
                    >
                      <Ban className="mr-1" size={20} />
                      Cancel
                    </Button>
                    <Button type="submit">
                      <Save className="mr-1" size={20} /> Save changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <CardContent>
            <Separator className="mb-4 w-full border border-neutral-300" />
            <div className="space-y-4">
              <div className="flex justify-between">
                <div>
                  <BugStatusBadge status={status} />
                </div>
                <div>
                  <BugPriorityBadge priority={priority} />
                </div>
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-950">
                  Title
                </h3>
                <p className="text-sm font-medium text-neutral-600">{title}</p>
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
                  Assigned To
                </h3>
                <p className="text-sm font-medium text-neutral-600">
                  {assignedTo}
                </p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-950">
                  Created
                </h3>
                <p className="text-sm font-medium text-neutral-600">
                  {createdAt.toLocaleDateString()}
                </p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-950">
                  Last Updated
                </h3>
                <p className="text-sm font-medium text-neutral-600">
                  {updatedAt.toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
