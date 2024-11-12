import React from "react";
import axios from "axios";
import { Bug, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";

interface AsigneeSelectProps {
  bug?: Bug;
}

const AsigneeSelect = ({ bug }: AsigneeSelectProps) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  if (error) return <p>Error</p>;

  if (isLoading) return <p>Loading...</p>;

  const assigneIssue = (userId: string) => {
    axios.patch("/api/bugs/" + bug?.id, {
      assignedToUserId: userId === "Unassigned" ? null : userId,
    });
  };

  return (
    <Select
      defaultValue={bug?.assignedToUserId || "Unassigned"}
      onValueChange={assigneIssue}
    >
      <SelectTrigger className="col-span-3 border border-gray-400">
        <SelectValue placeholder="Assign a User" />
      </SelectTrigger>
      <SelectContent className="flex items-center justify-center border border-gray-700">
        <SelectItem
          value="Unassigned"
          className="cursor-pointer hover:bg-transparent"
        >
          Unassigned
        </SelectItem>
        {users?.map((user) => (
          <SelectItem
            key={user.id}
            value={user.id}
            className="cursor-pointer hover:bg-transparent"
          >
            {user.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default AsigneeSelect;
