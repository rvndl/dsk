import { Transfers } from "@components/transfers";
import { Navbar } from "@components/navbar";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <div>
      <Toaster />
      <Navbar />
      <main className="main">{children}</main>
      <Transfers />
    </div>
  );
};
