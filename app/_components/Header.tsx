/* eslint-disable */
"use client";

import React from "react";
import Link from "next/link";
import { ShieldHalf } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const Header = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();
  const links = [
    { id: 1, label: "Home", href: "/" },
    { id: 2, label: "Bugs", href: "/bugs" },
    { id: 3, label: "Contact", href: "/contact" },
  ];
  return (
    <nav className="mb-5 flex h-14 items-center space-x-6 border-b px-5">
      <Link href="/">
        <ShieldHalf />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.id}>
            <Link
              href={link.href}
              className={` ${link.href === currentPath ? "font-semibold text-zinc-800" : "text-zinc-600 hover:text-zinc-800"} transition-all`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <div>
        {status === "authenticated" && (
          <Link href="/api/auth/signout">Log Out</Link>
        )}
        {status === "unauthenticated" && (
          <Link href="/api/auth/signin">Log In</Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
