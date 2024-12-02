"use client";

import React from "react";
import Link from "next/link";
import { Session } from "next-auth";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOut, Settings, User, Sun, Moon, Palette } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "./ui/dropdown-menu";

interface UserDropDownMenuProps {
  session: Session;
}

const UserDropDownMenu: React.FC<UserDropDownMenuProps> = ({ session }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={session.user?.image || ""}
              referrerPolicy="no-referrer"
              alt={session.user?.name || "Usuario"}
            />
            <AvatarFallback>
              {session.user?.name?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session.user?.name || "Usuario"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session.user?.email || "usuario@ejemplo.com"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer hover:bg-muted">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer hover:bg-muted">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <div className="flex cursor-pointer items-center justify-between px-2 py-2 transition-all duration-300 hover:bg-muted">
          <Palette className="h-4 w-4" />
          <span className="mr-1 text-sm font-medium">Dark Theme</span>
          <Sun className="mr-[-8px] h-4 w-4 text-muted-foreground" />
          <label className="relative inline-flex cursor-pointer items-center">
            <input type="checkbox" className="peer sr-only" />
            <div className="peer h-5 w-10 rounded-full bg-gray-200 transition-colors duration-300 ease-in-out peer-checked:bg-slate-800 dark:bg-gray-700"></div>
            <div className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full border border-gray-300 bg-white shadow-sm transition-transform duration-300 ease-in-out peer-checked:translate-x-5"></div>
          </label>
          <Moon className="ml-[-8px] h-4 w-4 text-muted-foreground" />
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="group cursor-pointer hover:bg-muted-foreground">
          <Link href="/api/auth/signout" className="flex w-full items-center">
            <LogOut className="mr-2 h-4 w-4 font-bold group-hover:font-extrabold group-hover:text-red-800" />
            <span>Cerrar sesión</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropDownMenu;
