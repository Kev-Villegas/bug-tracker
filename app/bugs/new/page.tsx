"use client";

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

export default function Component() {
  return (
    <Card className="mx-auto mt-20 w-full max-w-md">
      <CardHeader>
        <CardTitle>Report a New Bug</CardTitle>
        <CardDescription>
          Please provide details about the bug you&apos;ve encountered.
        </CardDescription>
      </CardHeader>
      <form>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Bug Title</Label>
            <Input id="title" placeholder="Enter a brief title for the bug" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Bug Description</Label>
            <Textarea
              id="description"
              placeholder="Provide a detailed description of the bug"
              className="resize-none"
              rows={4}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Submit Bug & Report
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
