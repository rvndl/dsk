import { IconLogout } from "@components/icon";

import Image from "next/future/image";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@components/button";
import { useRouter } from "next/router";
import clsx from "clsx";

const navigation = [
  { name: "Files", to: "/files" },
  { name: "Dashboard", to: "/dashboard" },
];

export const Navbar = () => {
  const router = useRouter();
  const { status } = useSession();

  const isAuthenticated = status !== "unauthenticated";

  return (
    <nav className="flex items-center justify-between h-16 p-2 bg-white border-b border-slate-200">
      <div className="flex items-center">
        <Link href="/">
          <>
            <Image
              src="/logo.png"
              height={69}
              width={134}
              alt="logo"
              className="hidden w-auto h-10 cursor-pointer select-none md:block"
            />
            <Image
              src="/logo-minimal.png"
              height={69}
              width={134}
              alt="logo"
              className="block w-auto h-10 cursor-pointer select-none md:hidden"
            />
          </>
        </Link>
        {isAuthenticated && (
          <div className="flex items-center ml-8 gap-x-4">
            {navigation.map(({ name, to }, idx) => (
              <Link href={to} key={idx}>
                <div
                  key={idx}
                  className={clsx(
                    "inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-50 hover:text-gray-900 cursor-pointer",
                    {
                      "bg-gray-100": router.pathname.includes(to),
                    }
                  )}
                >
                  {name}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {isAuthenticated && (
        <Button
          variant="secondary"
          className="border-none shadow-none"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Logout
          <span className="ml-2">
            <IconLogout />
          </span>
        </Button>
      )}
    </nav>
  );
};
