import { FileProgress } from "@components/file-progress";
import { Navbar } from "@components/navbar";
import { Toaster } from "react-hot-toast";

export const Layout = ({ children }: any) => {
  return (
    <div className="">
      <Toaster />
      <Navbar />
      <main className="main">{children}</main>
      <FileProgress />
    </div>
  );
};
