/* eslint-disable */
"use client";

import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { LogOut, ShieldHalf } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Header = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { id: 1, label: "Home", href: "/" },
    { id: 2, label: "Bugs", href: "/bugs" },
    { id: 3, label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="mb-5 flex h-14 items-center justify-between border-b px-5">
      <div className="flex items-center space-x-4 md:space-x-6">
        <Link href="/">
          <ShieldHalf />
        </Link>
        <ul className="flex space-x-4 md:space-x-6">
          {links.map((link) => (
            <li key={link.id}>
              <Link
                href={link.href}
                className={` ${
                  link.href === currentPath
                    ? "font-semibold text-zinc-800"
                    : "text-zinc-600 hover:text-zinc-800"
                } transition-all`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-center text-sm md:text-base">
        {status === "authenticated" && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src={session.user!.image!} />
                <AvatarFallback>{session.user!.name![0]}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded border bg-white shadow-md">
              {/* {session?.user?.name && (
                <DropdownMenuItem>{session.user.name}</DropdownMenuItem>
              )} */}
              {session?.user?.name && (
                <DropdownMenuItem>{session.user.email}</DropdownMenuItem>
              )}
              <DropdownMenuItem className="flex">
                <Link href="/api/auth/signout" className="w-full">
                  <Button
                    size="sm"
                    className="flex w-full"
                    variant="destructive"
                  >
                    <LogOut className="mr-2" size={16} />
                    <span>Log Out</span>
                  </Button>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {status === "unauthenticated" && (
          <Link href="/api/auth/signin">Log In</Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
