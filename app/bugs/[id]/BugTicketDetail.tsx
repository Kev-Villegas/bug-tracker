"use client";

import { Status } from "@prisma/client";
import { useRouter } from "next/navigation";
import { CircleArrowLeft } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { Separator } from "@/app/_components/ui/separator";
import BugStatusBadge from "@/app/_components/BugStatusBadge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";

interface BugTicketDetailProps {
  id: number;
  title: string;
  description: string;
  assignedTo: string;
  createdAt: Date;
  updatedAt: Date;
  status: Status;
}

export default function BugTicketDetail({
  id,
  title,
  description,
  assignedTo,
  status,
  createdAt,
  updatedAt,
}: BugTicketDetailProps) {
  const router = useRouter();

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
            </div>
          </div>
          <CardContent>
            <Separator className="mb-4 w-full border border-neutral-300" />
            <div className="space-y-4">
              <div>
                <span className="font-sans font-bold text-gray-900">
                  Current Status:
                </span>{" "}
                <BugStatusBadge status={status} />
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
