/* eslint-disable no-unused-vars */
"use client";

import { useState } from "react";
import { Ban, Save } from "lucide-react";
import { Status, Priority } from "@prisma/client";
import { Label } from "@/app/_components/ui/label";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { Textarea } from "@/app/_components/ui/textarea";
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

interface EditBugDialogProps {
  title: string;
  summary: string;
  description: string;
  status: Status;
  priority: Priority;
  createdAt: Date;
  updatedAt: Date;
  onSave: (updatedData: {
    title: string;
    summary: string;
    description: string;
    status: Status;
    priority: Priority;
  }) => void;
}

const EditBugDialog: React.FC<EditBugDialogProps> = ({
  title,
  summary,
  description,
  status,
  priority,
  onSave,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editStatus, setEditStatus] = useState(status);
  const [editSummary, setEditSummary] = useState(summary);
  const [editPriority, setEditPriority] = useState(priority);
  const [editDescription, setEditDescription] = useState(description);

  const handleStatusChange = (value: string) => setEditStatus(value as Status);
  const handlePriorityChange = (value: string) =>
    setEditPriority(value as Priority);

  const handleSave = () => {
    onSave({
      title: editTitle,
      summary: editSummary,
      description: editDescription,
      status: editStatus,
      priority: editPriority,
    });
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="mr-3" onClick={() => setIsDialogOpen(true)}>
          Edit Ticket
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
            <Label htmlFor="priority" className="text-right">
              Priority
            </Label>
            <Select onValueChange={handlePriorityChange} value={editPriority}>
              <SelectTrigger className="col-span-3 border border-gray-400">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent className="border border-gray-700">
                <SelectItem
                  value="LOW"
                  className="cursor-pointer text-green-600"
                >
                  Low
                </SelectItem>
                <SelectItem
                  value="MEDIUM"
                  className="cursor-pointer text-yellow-600"
                >
                  Medium
                </SelectItem>
                <SelectItem
                  value="HIGH"
                  className="cursor-pointer text-red-600"
                >
                  High
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select onValueChange={handleStatusChange} value={editStatus}>
              <SelectTrigger className="col-span-3 border border-gray-400">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="border border-gray-700">
                <SelectItem
                  value="OPEN"
                  className="cursor-pointer text-sky-600"
                >
                  Open
                </SelectItem>
                <SelectItem
                  value="IN_PROGRESS"
                  className="cursor-pointer text-yellow-600"
                >
                  In Progress
                </SelectItem>
                <SelectItem
                  value="RESOLVED"
                  className="cursor-pointer text-red-600"
                >
                  Resolved
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="flex justify-between">
          <Button
            variant="destructive"
            className="flex items-center"
            onClick={() => setIsDialogOpen(false)}
          >
            <Ban className="mr-1" size={20} /> Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-1" size={20} /> Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditBugDialog;
