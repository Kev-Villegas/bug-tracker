"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Spinner from "@/app/_components/Spinner";
import { Label } from "@/app/_components/ui/label";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { Textarea } from "@/app/_components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import axios from "axios";

interface BugForm {
  title: string;
  description: string;
}

const NewBugPage = () => {
  const { register, handleSubmit } = useForm<BugForm>();
  const [isSubmitting, setSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post("/api/bugs", data);
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
    <Card className="mx-auto mt-20 w-full max-w-md">
      <CardHeader>
        <CardTitle>Report a New Bug</CardTitle>
        <CardDescription>
          Please provide details about the bug you&apos;ve encountered.
        </CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="title">Bug Title</Label>
            <Input
              id="title"
              placeholder="Enter a brief title for the bug"
              {...register("title")}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="description">Bug Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Provide a detailed description of the bug"
              className="resize-none"
              rows={4}
            />
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

export default NewBugPage;
