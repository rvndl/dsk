import { Button } from "@components/button";
import { IconLogout } from "@components/icon";

import Logo from "@assets/svg/logo.svg";
import Image from "next/image";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-2 border-b border-slate-200">
      <div className="flex items-center">
        <div className="flex items-center select-none">
          <Image src={Logo} height={30} width={30} alt="logo" />
          <p className="ml-2 font-bold">dsk</p>
        </div>
      </div>
      <Button className="px-3 py-1 font-medium text-blue-700 bg-blue-500 rounded-lg bg-opacity-20 hover:bg-opacity-30">
        Shared files
      </Button>
      <div className="p-2 font-medium text-red-700 transition-colors bg-red-500 rounded-lg cursor-pointer bg-opacity-20 hover:bg-opacity-30">
        <IconLogout />
      </div>
    </nav>
  );
};
