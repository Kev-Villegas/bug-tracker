"use client";

import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { ShieldHalf } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import UserDropDownMenu from "./UserDropDownMenu";

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
        {status === "authenticated" && session && (
          <UserDropDownMenu session={session} />
        )}
        {status === "unauthenticated" && (
          <Button variant="outline" className="bg-neutral-200">
            <Link href="/api/auth/signin" className="font-medium text-zinc-950">
              Log In
            </Link>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Header;
