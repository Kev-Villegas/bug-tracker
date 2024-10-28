"use client";

import axios from "axios";
import { User } from "@prisma/client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";

const AsigneeSelect = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get<User[]>("/api/users");
      setUsers(data);
    };
    fetchUsers();
  }, []);
  return (
    <Select>
      <SelectTrigger className="col-span-3 border border-gray-400">
        <SelectValue placeholder="Select priority" />
      </SelectTrigger>
      <SelectContent className="border border-gray-700">
        {users.map((user) => (
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
