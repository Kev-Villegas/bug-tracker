/* eslint-disable no-unused-vars */
"use client";

import { useState } from "react";
import AsigneeSelect from "./AsigneeSelect";
import { Pencil, Save } from "lucide-react";
import { Label } from "@/app/_components/ui/label";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { Status, Priority, Bug } from "@prisma/client";
import { Textarea } from "@/app/_components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";

interface EditBugDialogProps {
  bug: Bug;
  onSave: (updatedData: {
    title: string;
    summary: string;
    description: string;
    status: Status;
    priority: Priority;
    assignedToUserId: string | null;
  }) => void;
}

const EditBugDialog: React.FC<EditBugDialogProps> = ({ bug, onSave }) => {
  const { title, summary, description, status, priority, assignedToUserId } =
    bug;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editSummary, setEditSummary] = useState(summary);
  const [editDescription, setEditDescription] = useState(description);
  const [editStatus, setEditStatus] = useState<Status>(status);
  const [editPriority, setEditPriority] = useState<Priority>(priority);
  const [editAssignedTo, setEditAssignedTo] = useState<string | null>(
    assignedToUserId,
  );

  const handleStatusChange = (value: string) => setEditStatus(value as Status);
  const handlePriorityChange = (value: string) =>
    setEditPriority(value as Priority);

  const handleAssignChange = (userId: string | null) => {
    setEditAssignedTo(userId);
  };

  const handleSave = () => {
    onSave({
      title: editTitle,
      summary: editSummary,
      description: editDescription,
      status: editStatus,
      priority: editPriority,
      assignedToUserId: editAssignedTo,
    });
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="mr-2" onClick={() => setIsDialogOpen(true)}>
          <Pencil className="mr-1" size={16} /> Edit Ticket
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
            <Input
              id="title"
              value={editTitle}
              className="col-span-3"
              onChange={(e) => setEditTitle(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="summary" className="text-right">
              Summary
            </Label>
            <Textarea
              id="summary"
              value={editSummary}
              className="col-span-3 resize-none"
              onChange={(e) => setEditSummary(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              value={editDescription}
              className="col-span-3 resize-none"
              onChange={(e) => setEditDescription(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="assignedTo" className="text-right">
              Assigned To:
            </Label>
            <div className="col-span-3">
              <AsigneeSelect
                defaultAssignee={editAssignedTo || "Unassigned"}
                onAssignChange={handleAssignChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priority" className="text-right">
              Priority
            </Label>
            <Select value={editPriority} onValueChange={handlePriorityChange}>
              <SelectTrigger className="col-span-3 border border-gray-400">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LOW">Low</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select value={editStatus} onValueChange={handleStatusChange}>
              <SelectTrigger className="col-span-3 border border-gray-400">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="OPEN">Open</SelectItem>
                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                <SelectItem value="RESOLVED">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>
            <Save className="mr-1" size={16} /> Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditBugDialog;
