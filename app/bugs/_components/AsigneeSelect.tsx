/* eslint-disable no-unused-vars */
import React from "react";
import useUsers from "@/app/_hooks/useUsers";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";

interface AsigneeSelectProps {
  defaultAssignee?: string;
  onAssignChange?: (userId: string | null) => void;
}

const AsigneeSelect = ({
  defaultAssignee,
  onAssignChange,
}: AsigneeSelectProps) => {
  const { data: users, error, isLoading } = useUsers();

  if (error) return <p>Error loading users</p>;
  if (isLoading) return <p>Loading users...</p>;

  const handleChange = (userId: string) => {
    const resolvedId = userId === "Unassigned" ? null : userId;
    onAssignChange?.(resolvedId);
  };

  return (
    <Select
      value={defaultAssignee || "Unassigned"}
      onValueChange={handleChange}
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
