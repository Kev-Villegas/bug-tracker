"use client";

import React from "react";
import Link from "next/link";
import { Session } from "next-auth";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface UserDropDownMenuProps {
  session: Session;
}

const UserDropDownMenu: React.FC<UserDropDownMenuProps> = ({ session }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage
            src={session.user!.image || ""}
            referrerPolicy="no-referrer"
          />
          <AvatarFallback>{session.user!.name?.[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded border bg-white shadow-md">
        {session.user!.email && (
          <DropdownMenuItem>{session.user!.email}</DropdownMenuItem>
        )}
        <DropdownMenuItem className="flex">
          <Link href="/api/auth/signout" className="w-full">
            <Button size="sm" className="flex w-full" variant="destructive">
              <LogOut className="mr-2" size={16} />
              <span>Log Out</span>
            </Button>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropDownMenu;
