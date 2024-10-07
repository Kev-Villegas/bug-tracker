"use client";

import React from "react";
import Link from "next/link";
import { ShieldHalf } from "lucide-react";

const Header = () => {
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
              className="text-zinc-600 transition-all hover:text-zinc-800"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Header;
