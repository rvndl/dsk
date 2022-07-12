import { Button } from "@components/button";
import { IconLogout } from "@components/icon";

import Image from "next/future/image";
import { signOut } from "next-auth/react";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between h-auto p-2 bg-white border-b border-slate-200">
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/logo.png"
            height={69}
            width={134}
            alt="logo"
            className="w-auto h-10 cursor-pointer select-none"
          />
        </Link>
      </div>
      <Button className="px-3 py-1 font-medium text-blue-700 bg-blue-500 rounded-lg bg-opacity-20 hover:bg-opacity-25">
        Shared files
      </Button>
      <div
        className="p-2 font-medium text-red-700 transition-colors bg-red-500 rounded-lg cursor-pointer bg-opacity-20 hover:bg-opacity-30"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        <IconLogout />
      </div>
    </nav>
  );
};
