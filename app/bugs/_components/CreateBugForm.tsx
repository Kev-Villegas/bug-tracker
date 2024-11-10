"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Spinner from "@/app/_components/Spinner";
import { Priority, Status, Bug } from "@prisma/client";
import { Label } from "@/app/_components/ui/label";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/app/_components/ui/textarea";
import { createBugSchema } from "@/app/_schemas/validationSchemas";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import AsigneeSelect from "./AsigneeSelect";

interface BugForm {
  title: string;
  summary: string;
  description: string;
  status: Status;
  priority: Priority;
}

const CreateBugForm = ({ bug }: { bug: Bug }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BugForm>({ resolver: zodResolver(createBugSchema) });
  const [isSubmitting, setSubmitting] = useState(false);
  const router = useRouter();
  const [priority, setPriority] = useState<Priority | undefined>();
  const [status, setStatus] = useState<Status | undefined>();

  const handlePriorityChange = (value: Priority) => {
    setPriority(value);
  };
  const handleStatusChange = (value: Status) => {
    setStatus(value);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      const payload = {
        ...data,
        priority: priority,
        status: status,
      };
      await axios.post("/api/bugs", payload);
      toast.success("Bug Reported Successfully");
    } catch (error) {
      console.error("Failed to report bug", error);
      toast.error("Failed to report bug");
    } finally {
      setSubmitting(false);
      router.push("/bugs");
    }
  });
  return (
    <Card className="mx-auto mb-6 w-full max-w-md">
      <CardHeader>
        <CardTitle>Report a New Bug</CardTitle>
        <CardDescription>
          Please provide details about the bug you&apos;ve encountered.
        </CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter a brief title for the bug"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="summary">Summary</Label>
            <Textarea
              id="summary"
              {...register("summary")}
              placeholder="Provide a detailed summary of the bug"
              className="resize-none"
              rows={2}
            />
            {errors.summary && (
              <p className="text-sm text-red-500">{errors.summary.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Provide a detailed description of the bug"
              className="resize-none"
              rows={3}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-1">
            <Label htmlFor="assignedTo" className="text-start">
              Assigned To:
            </Label>
            <br />
            <AsigneeSelect bug={bug} />
          </div>
          <div className="grid grid-cols-4 items-center gap-1">
            <Label htmlFor="priority" className="text-start">
              Priority
            </Label>
            <br />
            <Select onValueChange={handlePriorityChange} value={priority}>
              <SelectTrigger className="col-span-3 border border-gray-400">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent className="border border-gray-700">
                <SelectItem
                  value="LOW"
                  className="cursor-pointer text-green-600 hover:bg-transparent"
                >
                  Low
                </SelectItem>
                <SelectItem
                  value="MEDIUM"
                  className="cursor-pointer text-yellow-600 hover:bg-transparent"
                >
                  Medium
                </SelectItem>
                <SelectItem
                  value="HIGH"
                  className="cursor-pointer text-red-600 hover:bg-transparent"
                >
                  High
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-1">
            <Label htmlFor="status" className="text-start">
              Status
            </Label>
            <br />
            <Select onValueChange={handleStatusChange} value={status}>
              <SelectTrigger className="col-span-3 border border-gray-400">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="border border-gray-700">
                <SelectItem
                  value="OPEN"
                  className="cursor-pointer bg-transparent text-sky-500"
                >
                  Open
                </SelectItem>
                <SelectItem
                  value="IN_PROGRESS"
                  className="cursor-pointer bg-transparent text-yellow-600"
                >
                  In Progress
                </SelectItem>
                <SelectItem
                  value="RESOLVED"
                  className="cursor-pointer bg-transparent text-green-600"
                >
                  Resolved
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <div className="flex items-center">
                  <span className="mr-2 tracking-wider">Reporting...</span>
                  <Spinner />
                </div>
              </>
            ) : (
              "Submit & Report Bug"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreateBugForm;
