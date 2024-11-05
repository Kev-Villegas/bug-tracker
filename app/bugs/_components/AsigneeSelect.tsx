"use client";

import React from "react";
import axios from "axios";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";

const AsigneeSelect = () => {
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

  return (
    <Select>
      <SelectTrigger className="col-span-3 border border-gray-400">
        <SelectValue placeholder="Select priority" />
      </SelectTrigger>
      <SelectContent className="border border-gray-700">
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
