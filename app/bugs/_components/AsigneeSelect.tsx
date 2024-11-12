import React from "react";
import axios from "axios";
import { Bug } from "@prisma/client";
import useUsers from "@/app/_hooks/useUsers";
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
  const { data: users, error, isLoading } = useUsers();

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
