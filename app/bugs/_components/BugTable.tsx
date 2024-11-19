import React from "react";
import useBugs from "@/app/_hooks/useBugs";
import useUsers from "@/app/_hooks/useUsers";
import BugStatusBadge from "./BugStatusBadge";
import BugPriorityBadge from "./BugPriorityBadge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";

const BugList = () => {
  const { data: bugs, isLoading, isError, error } = useBugs();
  const { data: users } = useUsers();

  const getInitials = (name: string) => {
    const [firstName, lastName] = name.split(" ");
    return (firstName?.charAt(0) || "") + (lastName?.charAt(0) || "");
  };

  if (isLoading) {
    return <p>Loading bugs...</p>;
  }

  if (isError) {
    return (
      <p className="text-red-500">
        Failed to load bugs. {error instanceof Error ? error.message : ""}
      </p>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Title</TableHead>
              <TableHead className="hidden md:table-cell">Summary</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden sm:table-cell">
                Assigned To
              </TableHead>
              <TableHead className="hidden lg:table-cell">Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bugs?.map((bug) => {
              const assignedUser = users?.find(
                (user) => user.id === bug.assignedToUserId,
              );
              return (
                <TableRow key={bug.id}>
                  <TableCell className="font-medium">{bug.title}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {bug.summary}
                  </TableCell>
                  <TableCell>
                    <BugPriorityBadge priority={bug.priority} />
                  </TableCell>
                  <TableCell>
                    <BugStatusBadge status={bug.status} />
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {assignedUser ? (
                      <div className="flex items-center space-x-2">
                        <Avatar>
                          <AvatarImage
                            src={assignedUser.image || ""}
                            alt={assignedUser.name || ""}
                          />
                          <AvatarFallback>
                            {getInitials(assignedUser.name || "")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-slate-900">
                          {assignedUser.name}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        Unassigned
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {new Date(bug.createdAt).toLocaleDateString("en-GB")}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BugList;
